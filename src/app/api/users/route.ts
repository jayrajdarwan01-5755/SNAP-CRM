import { NextResponse } from "next/server";
import { User } from "@/types/user";

let users: User[] = [

  {
    UserId: 1,
    Username: "admin",
    Password: "admin123",
    Role: "Administrator",
    Status: "Active",
  },

  {
    UserId: 2,
    Username: "john.doe",
    Password: "john123",
    Role: "Manager",
    Status: "Active",
  },

  {
    UserId: 3,
    Username: "jane.smith",
    Password: "jane123",
    Role: "HR",
    Status: "Inactive",
  },

];

// GET ALL USERS
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id) {

    const user = users.find(
      (u) => u.UserId === Number(id)
    );

    if (!user) {

      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );

    }

    return NextResponse.json(user);

  }

  return NextResponse.json(users);

}

// ADD USER
export async function POST(request: Request) {

  const body: User = await request.json();

  const newUser: User = {

    ...body,

    UserId: Date.now(),

  };

  users.push(newUser);

  return NextResponse.json(newUser);

}

// UPDATE USER
export async function PUT(request: Request) {

  const body: User = await request.json();

  users = users.map((user) =>

    user.UserId === body.UserId

      ? body

      : user

  );

  return NextResponse.json({

    message: "User updated successfully",

  });

}

// DELETE USER
export async function DELETE(request: Request) {

  const body = await request.json();

  users = users.filter(

    (user) => user.UserId !== body.UserId

  );

  return NextResponse.json({

    message: "User deleted successfully",

  });

}