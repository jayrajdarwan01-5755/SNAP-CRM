import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("backups")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Backup not found",
        },
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="backup.json"',
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Download failed",
      },
      {
        status: 500,
      }
    );
  }
}