import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
try {
const { userid, currentPassword, newPassword } =
await request.json();

// Validate input
if (!userid || !currentPassword || !newPassword) {
  return NextResponse.json(
    {
      success: false,
      message: "All fields are required",
    },
    { status: 400 }
  );
}

// Password validation
if (newPassword.length < 6) {
  return NextResponse.json(
    {
      success: false,
      message: "New password must be at least 6 characters long",
    },
    { status: 400 }
  );
}

// Check current password
const { data: user, error: userError } = await supabaseServer
  .from("users")
  .select("userid, password")
  .eq("userid", userid)
  .single();

if (userError || !user) {
  return NextResponse.json(
    {
      success: false,
      message: "User not found",
    },
    { status: 404 }
  );
}

// Verify current password
if (user.password !== currentPassword) {
  return NextResponse.json(
    {
      success: false,
      message: "Current password is incorrect",
    },
    { status: 401 }
  );
}

// Prevent same password
if (currentPassword === newPassword) {
  return NextResponse.json(
    {
      success: false,
      message: "New password must be different from current password",
    },
    { status: 400 }
  );
}

// Update password
const { error: updateError } = await supabaseServer
  .from("users")
  .update({
    password: newPassword,
  })
  .eq("userid", userid);

if (updateError) {
  console.error("Change password error:", updateError);

  return NextResponse.json(
    {
      success: false,
      message: "Failed to update password",
    },
    { status: 500 }
  );
}

return NextResponse.json(
  {
    success: true,
    message: "Password changed successfully",
  },
  { status: 200 }
);


} catch (error) {
console.error("Change password error:", error);

return NextResponse.json(
  {
    success: false,
    message: "Something went wrong",
  },
  { status: 500 }
);

}
}
