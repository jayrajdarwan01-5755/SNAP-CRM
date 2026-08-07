import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET ALL ROLES
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabaseServer
        .from("roles")
        .select("*")
        .eq("roleid", id)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { message: "Role not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        RoleId: data.roleid,
        RoleName: data.rolename,
        Description: data.description,
        Status: data.status,
      });
    }

    const { data, error } = await supabaseServer
      .from("roles")
      .select("*")
      .order("roleid");

    if (error) throw error;

    return NextResponse.json(
      data.map((role) => ({
        RoleId: role.roleid,
        RoleName: role.rolename,
        Description: role.description,
        Status: role.status,
      }))
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

// ADD ROLE
export async function POST(request: Request) {
  try {
    const body = await request.json();

        // Duplicate role check
    const { data: existingRole } = await supabaseServer
      .from("roles")
      .select("roleid")
      .ilike("rolename", body.RoleName)
      .maybeSingle();

    if (existingRole) {
      return NextResponse.json(
        { message: "Role name already exists" },
        { status: 400 }
      );
    }

     // Insert new role
    const { data, error } = await supabaseServer
      .from("roles")
      .insert({
        rolename: body.RoleName,
        description: body.Description,
        status: body.Status,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      message: "Role added successfully",
      role: {
        RoleId: data.roleid,
        RoleName: data.rolename,
        Description: data.description,
        Status: data.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add role" },
      { status: 500 }
    );
  }
}

// UPDATE ROLE
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { error } = await supabaseServer
      .from("roles")
      .update({
        rolename: body.RoleName,
        description: body.Description,
        status: body.Status,
      })
      .eq("roleid", body.RoleId);

    if (error) throw error;

    return NextResponse.json({
      message: "Role updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update role" },
      { status: 500 }
    );
  }
}

// DELETE ROLE
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { error } = await supabaseServer
      .from("roles")
      .delete()
      .eq("roleid", body.RoleId);

    if (error) throw error;

    return NextResponse.json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete role" },
      { status: 500 }
    );
  }
}