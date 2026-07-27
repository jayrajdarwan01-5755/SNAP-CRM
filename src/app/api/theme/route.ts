import { NextResponse } from "next/server";


// Temporary Theme Storage
// Baad me isko Supabase database se replace karenge
let themeSettings = {
  id: 1,
  primaryColor: "#2563eb",
  secondaryColor: "#64748b",
  backgroundColor: "#ffffff",
  textColor: "#111827",
  darkMode: false,
  fontSize: "medium",
  sidebarColor: "#1e293b",
};


// =========================
// GET THEME SETTINGS
// URL: GET /api/theme
// =========================
export async function GET() {

  try {

    return NextResponse.json({
      success: true,
      data: themeSettings,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load theme settings",
      },
      {
        status: 500,
      }
    );

  }

}


// =========================
// UPDATE THEME SETTINGS
// URL: POST /api/theme
// =========================
export async function POST(request: Request) {

  try {

    const body = await request.json();


    themeSettings = {
      ...themeSettings,
      ...body,
    };


    return NextResponse.json({
      success: true,
      message: "Theme settings updated successfully",
      data: themeSettings,
    });


  } catch (error) {


    return NextResponse.json(
      {
        success: false,
        message: "Failed to update theme settings",
      },
      {
        status: 500,
      }
    );

  }

}


// =========================
// DELETE RESET THEME
// URL: DELETE /api/theme
// =========================
export async function DELETE() {

  try {


    themeSettings = {
      id: 1,
      primaryColor: "#2563eb",
      secondaryColor: "#64748b",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      darkMode: false,
      fontSize: "medium",
      sidebarColor: "#1e293b",
    };


    return NextResponse.json({
      success: true,
      message: "Theme reset successfully",
      data: themeSettings,
    });


  } catch (error) {


    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset theme",
      },
      {
        status: 500,
      }
    );

  }

}