import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseServer } from "@/lib/supabaseServer";


export async function POST() {

  try {


    // Get SMTP Settings

    const { data, error } = await supabaseServer
      .from("email_settings")
      .select("*")
      .single();



    if(error || !data){

      return NextResponse.json(
        {
          message:"Email settings not found"
        },
        {
          status:400
        }
      );

    }



    // Create transporter

    const transporter = nodemailer.createTransport({

  host: data.smtp_host,

  port: Number(data.smtp_port),

  secure: false, // TLS ke liye false

  auth: {
    user: data.email,
    pass: data.password,
  },

  tls: {
    rejectUnauthorized: false,
  },

});



    // Send mail

    await transporter.sendMail({

      from:`${data.sender_name} <${data.email}>`,

      to:data.email,

      subject:"SNAP CRM Test Email",

      text:
      "Your SNAP CRM email configuration is working successfully.",

    });



    return NextResponse.json({

      message:"Test email sent successfully"

    });

  }


  catch(error:any){

  console.log("EMAIL ERROR:", error);

  return NextResponse.json(
    {
      message:error.message || "Email sending failed"
    },
    {
      status:500
    }
  );

}

}