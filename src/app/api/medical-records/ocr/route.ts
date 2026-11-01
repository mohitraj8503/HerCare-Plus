import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { extractMedicalRecordText } from "@/lib/medicalRecordOcr";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Please sign in to process medical documents." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select an image." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be between 1 byte and 10 MB." },
        { status: 400 }
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: "OCR supports JPEG and PNG images only." },
        { status: 415 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const isJpeg =
      file.type === "image/jpeg" &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff;

    const isPng =
      file.type === "image/png" &&
      bytes.subarray(0, 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      );

    if (!isJpeg && !isPng) {
      return NextResponse.json(
        { error: "Image contents do not match the file type." },
        { status: 415 }
      );
    }

    const result = await extractMedicalRecordText(file);

    return NextResponse.json(
      { ocr: result },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "OCR processing failed. Please try again." },
      { status: 500 }
    );
  }
}
