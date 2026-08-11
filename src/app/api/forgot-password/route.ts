import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { identifier } = body;

    // =========================
    // Validation
    // =========================

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        {
          message: "Please enter email or username",
        },
        {
          status: 400,
        }
      );
    }

    const searchValue = identifier.trim();

    // =========================
    // Find User
    // =========================

    let user = null;

    // First check username
    const {
      data: usernameUser,
      error: usernameError,
    } = await supabaseServer
      .from("users")
      .select("userid, username, email, fullname, status")
      .eq("username", searchValue)
      .maybeSingle();

    if (usernameError) {
      console.log(
        "Username lookup error:",
        usernameError
      );
    }

    if (usernameUser) {
      user = usernameUser;
    } else {
      // =========================
      // Check Email
      // =========================

      const {
        data: emailUser,
        error: emailError,
      } = await supabaseServer
        .from("users")
        .select("userid, username, email, fullname, status")
        .eq("email", searchValue)
        .maybeSingle();

      if (emailError) {
        console.log(
          "Email lookup error:",
          emailError
        );
      }

      if (emailUser) {
        user = emailUser;
      }
    }

    // =========================
    // User Not Found
    // =========================

    if (!user) {
      return NextResponse.json(
        {
          message:
            "If the account exists, a reset link has been sent to the registered email.",
        },
        {
          status: 200,
        }
      );
    }

    // =========================
    // Check User Status
    // =========================

    if (user.status === false) {
      return NextResponse.json(
        {
          message:
            "This account is inactive. Please contact administrator.",
        },
        {
          status: 403,
        }
      );
    }

    // =========================
    // Check Registered Email
    // =========================

    if (!user.email) {
      return NextResponse.json(
        {
          message:
            "No registered email found for this account. Please contact administrator.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // Get Email Credentials
    // =========================

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.log(
        "EMAIL_USER or EMAIL_PASSWORD is missing"
      );

      return NextResponse.json(
        {
          message:
            "Email service is not configured",
        },
        {
          status: 500,
        }
      );
    }

    // =========================
    // Generate Secure Token
    // =========================

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Token valid for 30 minutes
    const resetTokenExpires = new Date(
      Date.now() + 30 * 60 * 1000
    ).toISOString();

    // =========================
    // Save Token
    // =========================

    const {
      error: updateError,
    } = await supabaseServer
      .from("users")
      .update({
        reset_token: resetToken,
        reset_token_expires: resetTokenExpires,
      })
      .eq("userid", user.userid);

    if (updateError) {
      console.log(
        "Reset token update error:",
        updateError
      );

      return NextResponse.json(
        {
          message:
            "Failed to create password reset request",
        },
        {
          status: 500,
        }
      );
    }

    // =========================
    // Create Reset Link
    // =========================

    const requestUrl = new URL(
      request.url
    );

    const resetLink =
      `${requestUrl.origin}/reset-password?token=${resetToken}`;

    // =========================
    // Create Gmail SMTP Transporter
    // =========================

    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
          user: emailUser,
          pass: emailPassword,
        },

        tls: {
          rejectUnauthorized: false,
        },
      });

    // =========================
    // Send Reset Email
    // =========================

    await transporter.sendMail({
      from: `SNAP CRM <${emailUser}>`,

      to: user.email,

      subject:
        "SNAP CRM - Password Reset",

      text: `Hello ${user.fullname || user.username},

We received a request to reset your SNAP CRM password.

Click the link below to reset your password:

${resetLink}

This password reset link will expire in 30 minutes.

If you did not request a password reset, please ignore this email.

Regards,
SNAP CRM`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
        ">

          <h2 style="
            color: #2563eb;
            margin-bottom: 20px;
          ">
            SNAP CRM - Password Reset
          </h2>

          <p>
            Hello
            <strong>
              ${user.fullname || user.username}
            </strong>,
          </p>

          <p>
            We received a request to reset
            your SNAP CRM password.
          </p>

          <p>
            Click the button below to create
            a new password.
          </p>

          <div style="
            margin: 30px 0;
          ">

            <a
              href="${resetLink}"
              style="
                display: inline-block;
                padding: 12px 24px;
                background: #2563eb;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>

          </div>

          <p>
            Or copy and paste this link
            into your browser:
          </p>

          <p style="
            word-break: break-all;
            color: #2563eb;
          ">
            ${resetLink}
          </p>

          <p>
            This reset link will expire
            in <strong>30 minutes</strong>.
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
          ">
            If you did not request a password reset,
            please ignore this email.
          </p>

          <p>
            Regards,<br/>
            <strong>SNAP CRM</strong>
          </p>

        </div>
      `,
    });

    // =========================
    // Success
    // =========================

    return NextResponse.json(
      {
        message:
          "If the account exists, a reset link has been sent to the registered email.",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Failed to send password reset email",
      },
      {
        status: 500,
      }
    );
  }
}
