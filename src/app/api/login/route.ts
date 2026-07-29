import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      username,
      password
    } = body;


    if (!username || !password) {

      return NextResponse.json(
        {
          message: "Username and password required"
        },
        {
          status: 400
        }
      );

    }


    const { data, error } = await supabaseServer
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();



    if (error || !data) {

      return NextResponse.json(
        {
          message: "Invalid username or password"
        },
        {
          status: 401
        }
      );

    }



    if(data.status !== true){

      return NextResponse.json(
        {
          message:"User account inactive"
        },
        {
          status:403
        }
      );

    }



    return NextResponse.json(
      {
        message:"Login successful",
        user:data
      },
      {
        status:200
      }
    );



  } catch(error){


    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );

  }

}