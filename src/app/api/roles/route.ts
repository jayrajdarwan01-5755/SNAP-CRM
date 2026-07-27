import { NextResponse } from "next/server";
import { Role } from "@/types/role";

let roles: Role[] = [

  {
    RoleId: 1,
    RoleName: "Administrator",
    Description: "Full system access",
    Status: "Active",
  },

  {
    RoleId: 2,
    RoleName: "Manager",
    Description: "Manage department operations",
    Status: "Active",
  },

  {
    RoleId: 3,
    RoleName: "Employee",
    Description: "Limited system access",
    Status: "Inactive",
  },

];

// GET ALL ROLES
export async function GET() {

  return NextResponse.json(roles);

}

// ADD ROLE
export async function POST(request: Request) {

  const body = await request.json();

  const newRole: Role = {

    RoleId:
      roles.length > 0
        ? Math.max(...roles.map((r) => r.RoleId)) + 1
        : 1,

    RoleName: body.RoleName,

    Description: body.Description,

    Status: body.Status,

  };

  roles.push(newRole);

  return NextResponse.json({
    message: "Role added successfully",
    role: newRole,
  });

}

// UPDATE ROLE
export async function PUT(request: Request) {

  const body = await request.json();

  roles = roles.map((role) =>

    role.RoleId === body.RoleId
      ? {
          ...role,
          RoleName: body.RoleName,
          Description: body.Description,
          Status: body.Status,
        }
      : role

  );

  return NextResponse.json({
    message: "Role updated successfully",
  });

}

// DELETE ROLE
export async function DELETE(request: Request) {

  const body = await request.json();

  roles = roles.filter(

    (role) => role.RoleId !== body.RoleId

  );

  return NextResponse.json({
    message: "Role deleted successfully",
  });

}