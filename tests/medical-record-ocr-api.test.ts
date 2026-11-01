import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  extractMedicalRecordText: vi.fn(),
}));

vi.mock("next-auth/next", () => ({
  getServerSession: mocks.getServerSession,
}));

vi.mock("@/lib/authOptions", () => ({
  authOptions: {},
}));

vi.mock("@/lib/medicalRecordOcr", () => ({
  extractMedicalRecordText: mocks.extractMedicalRecordText,
}));

import { POST } from "../src/app/api/medical-records/ocr/route";

describe("Medical record OCR API security", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getServerSession.mockResolvedValue(null);

    mocks.extractMedicalRecordText.mockResolvedValue({
      text: "Hemoglobin 13.5 g/dL",
      status: "needs_human_review",
      message: "OCR text is unverified. Human review is required.",
    });
  });

  it("rejects unauthenticated OCR requests", async () => {
    const request = new Request(
      "http://localhost/api/medical-records/ocr",
      { method: "POST" }
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(mocks.extractMedicalRecordText).not.toHaveBeenCalled();
  });

  it("rejects requests without a file", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "test-user" },
    });

    const request = new Request(
      "http://localhost/api/medical-records/ocr",
      {
        method: "POST",
        body: new FormData(),
      }
    );

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mocks.extractMedicalRecordText).not.toHaveBeenCalled();
  });

  it("rejects unsupported file types", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "test-user" },
    });

    const formData = new FormData();
    formData.append(
      "file",
      new Blob(["unsafe content"], {
        type: "application/pdf",
      }),
      "report.pdf"
    );

    const request = new Request(
      "http://localhost/api/medical-records/ocr",
      {
        method: "POST",
        body: formData,
      }
    );

    const response = await POST(request);

    expect(response.status).toBe(415);
    expect(mocks.extractMedicalRecordText).not.toHaveBeenCalled();
  });

  it("rejects PNG files with invalid signatures", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "test-user" },
    });

    const formData = new FormData();
    formData.append(
      "file",
      new Blob(["not a real PNG image"], {
        type: "image/png",
      }),
      "fake.png"
    );

    const request = new Request(
      "http://localhost/api/medical-records/ocr",
      {
        method: "POST",
        body: formData,
      }
    );

    const response = await POST(request);

    expect(response.status).toBe(415);
    expect(mocks.extractMedicalRecordText).not.toHaveBeenCalled();
  });

  it("returns OCR text marked for human review for a valid PNG", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "test-user" },
    });

    const pngSignature = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10,
    ]);

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([pngSignature], {
        type: "image/png",
      }),
      "report.png"
    );

    const request = new Request(
      "http://localhost/api/medical-records/ocr",
      {
        method: "POST",
        body: formData,
      }
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ocr.text).toBe("Hemoglobin 13.5 g/dL");
    expect(body.ocr.status).toBe("needs_human_review");
    expect(mocks.extractMedicalRecordText).toHaveBeenCalledOnce();
  });
});
