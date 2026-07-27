import { NextResponse } from "next/server";
import { EmailSettings } from "@/types/emailSettings";

let emailSettings: EmailSettings = {

  SMTPHost: "smtp.gmail.com",

  SMTPPort: "587",

  Email: "admin@snapcrm.com",

  Password: "",

  SenderName: "SNAP CRM",

  Encryption: "TLS",

};

// GET EMAIL SETTINGS
export async function GET() {

  return NextResponse.json(emailSettings);

}

// UPDATE EMAIL SETTINGS
export async function PUT(request: Request) {

  const body: EmailSettings = await request.json();

  emailSettings = {

    ...emailSettings,

    ...body,

  };

  return NextResponse.json({

    message: "Email settings updated successfully",

    emailSettings,

  });

}