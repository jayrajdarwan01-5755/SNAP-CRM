import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";


// GET EMAIL SETTINGS

export async function GET() {

  try {

    const { data, error } = await supabaseServer
      .from("email_settings")
      .select("*")
      .single();


    if(error){

      throw error;

    }


    return NextResponse.json({

      id: data.id,

      SMTPHost: data.smtp_host,

      SMTPPort: data.smtp_port,

      Email: data.email,

      Password: data.password,

      SenderName: data.sender_name,

      Encryption: data.encryption,

    });


  }
  catch(error){

    return NextResponse.json(
      {
        message:"Failed to fetch email settings"
      },
      {
        status:500
      }
    );

  }

}






// UPDATE EMAIL SETTINGS

export async function PUT(
  request:Request
){

  try {


    const body = await request.json();



    const { error } = await supabaseServer
      .from("email_settings")
      .update({

        smtp_host: body.SMTPHost,

        smtp_port: body.SMTPPort,

        email: body.Email,

        password: body.Password,

        sender_name: body.SenderName,

        encryption: body.Encryption,

      })
      .eq("id",1);



    if(error){

      throw error;

    }



    return NextResponse.json({

      message:
      "Email settings updated successfully"

    });


  }
  catch(error){

    return NextResponse.json(

      {
        message:"Failed to update email settings"
      },

      {
        status:500
      }

    );

  }

}