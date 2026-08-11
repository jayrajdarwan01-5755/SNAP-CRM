import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token and password are required",
        },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    // Find user using reset token
    const { data: user, error: userError } = await supabaseServer
      .from("users")
      .select("*")
      .eq("reset_token", token)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset token",
        },
        { status: 400 }
      );
    }

    // Check token expiry
    if (
      !user.reset_token_expires ||
      new Date(user.reset_token_expires).getTime() < Date.now()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // Update password and invalidate reset token
    const { error: updateError } = await supabaseServer
      .from("users")
      .update({
        password: password,
        reset_token: null,
        reset_token_expires: null,
      })
      .eq("userid", user.userid);

    if (updateError) {
      console.error("Password update error:", updateError);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to reset password",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}