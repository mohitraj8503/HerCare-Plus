import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { validateWellnessInput } from "@/lib/wellness/wellnessValidation";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    if (!ownerId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("wellness_entries")
      .select("id, category, date, value, unit, notes, created_at")
      .eq("owner_id", ownerId)
      .order("date", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json(
        { error: "Unable to retrieve wellness entries." },
        { status: 502 }
      );
    }

    return NextResponse.json({ entries: data });
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve wellness entries." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    if (!ownerId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const validation = validateWellnessInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Invalid wellness data.",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const input = body as {
      category: string;
      date: string;
      value: number;
      unit: string;
      notes?: string;
    };

    const { data, error } = await supabaseAdmin
      .from("wellness_entries")
      .insert({
        owner_id: ownerId,
        category: input.category,
        date: input.date,
        value: input.value,
        unit: input.unit,
        notes: input.notes?.trim() ?? null,
      })
      .select("id, category, date, value, unit, notes, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Unable to save wellness entry." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { entry: data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to save wellness entry." },
      { status: 500 }
    );
  }
}