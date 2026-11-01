import path from "node:path";
import "server-only";

import { createWorker } from "tesseract.js";

export interface OcrResult {
  text: string;
  status: "needs_human_review";
  message: string;
}

const MAX_OCR_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
]);

/**
 * Extract text from supported medical-report images.
 * OCR output is unverified and must be reviewed by a person.
 */
export async function extractMedicalRecordText(
  file: File,
): Promise<OcrResult> {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("OCR currently supports JPEG and PNG images only.");
  }

  if (file.size === 0 || file.size > MAX_OCR_FILE_SIZE) {
    throw new Error("The image must be between 1 byte and 10 MB.");
  }

  const worker = await createWorker("eng", undefined, {
  workerPath: path.join(
    process.cwd(),
    "node_modules",
    "tesseract.js",
    "src",
    "worker-script",
    "node",
    "index.js"
  ),
});

  try {
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const { data } = await worker.recognize(imageBuffer);

    return {
      text: data.text.trim(),
      status: "needs_human_review",
      message:
        "OCR text is unverified. Review it against the original medical report before using any extracted values.",
    };
  } finally {
    await worker.terminate();
  }
}