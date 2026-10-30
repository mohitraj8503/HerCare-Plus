import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("tesseract.js", () => ({
  createWorker: vi.fn(),
}));

import { createWorker } from "tesseract.js";
import { extractMedicalRecordText } from "../src/lib/medicalRecordOcr";

describe("Medical record OCR", () => {
  const recognize = vi.fn();
  const terminate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    recognize.mockResolvedValue({
      data: { text: "Hemoglobin 13.5 g/dL" },
    });

    terminate.mockResolvedValue(undefined);

    vi.mocked(createWorker).mockResolvedValue({
      recognize,
      terminate,
    } as never);
  });

  it("rejects unsupported file types", async () => {
    const file = new File(["test"], "report.pdf", {
      type: "application/pdf",
    });

    await expect(extractMedicalRecordText(file)).rejects.toThrow(
      "OCR currently supports JPEG and PNG images only.",
    );

    expect(createWorker).not.toHaveBeenCalled();
  });

  it("rejects empty images", async () => {
    const file = new File([], "report.png", {
      type: "image/png",
    });

    await expect(extractMedicalRecordText(file)).rejects.toThrow(
      "The image must be between 1 byte and 10 MB.",
    );

    expect(createWorker).not.toHaveBeenCalled();
  });

  it("returns extracted text marked for human review", async () => {
    const file = new File(["test image data"], "report.png", {
      type: "image/png",
    });

    const result = await extractMedicalRecordText(file);

    expect(result.text).toBe("Hemoglobin 13.5 g/dL");
    expect(result.status).toBe("needs_human_review");
    expect(result.message).toContain("unverified");
    expect(terminate).toHaveBeenCalledOnce();
  });

  it("terminates the OCR worker if recognition fails", async () => {
    recognize.mockRejectedValueOnce(new Error("Recognition failed"));

    const file = new File(["test image data"], "report.png", {
      type: "image/png",
    });

    await expect(extractMedicalRecordText(file)).rejects.toThrow(
      "Recognition failed",
    );

    expect(terminate).toHaveBeenCalledOnce();
  });
});