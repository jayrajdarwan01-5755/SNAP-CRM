import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      fullname,
      username,
      email,
      password,
      role
    } = body;


    // Validation

    if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !role
    ) {

      return NextResponse.json(
        {
          message: "All fields are required"
        },
        {
          status: 400
        }
      );

    }


    // Check existing username

    const {
      data: existingUser
    } = await supabaseServer

      .from("users")

      .select("userid")

      .eq("username", username)

      .maybeSingle();


    if (existingUser) {

      return NextResponse.json(
        {
          message: "Username already exists"
        },
        {
          status: 409
        }
      );

    }


    // Check existing email

    const {
      data: existingEmail
    } = await supabaseServer

      .from("users")

      .select("userid")

      .eq("email", email)

      .maybeSingle();


    if (existingEmail) {

      return NextResponse.json(
        {
          message: "Email already exists"
        },
        {
          status: 409
        }
      );

    }


    // Create User

    const {
      data,
      error
    } = await supabaseServer

      .from("users")

      .insert([

        {

          fullname: fullname,

          username: username,

          email: email,

          password: password,

          role: role,

          status: true

        }

      ])

      .select()

      .single();


    if (error) {

      console.log(error);

      return NextResponse.json(
        {
          message: "Failed to create account"
        },
        {
          status: 500
        }
      );

    }


    return NextResponse.json(
      {

        message: "Account created successfully",

        user: data

      },
      {
        status: 201
      }
    );

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Server error"
      },
      {
        status: 500
      }
    );

  }

}