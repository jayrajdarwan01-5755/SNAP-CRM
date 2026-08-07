import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ==============================
// GET ALL LEADS
// ==============================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("leadid", { ascending: true });

    if (error) {
      return NextResponse.json(
        {
          message: "Failed to fetch leads",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const leads = data.map((lead) => ({
      LeadId: lead.leadid,
      LeadName: lead.leadname,
      Company: lead.company,
      Phone: lead.phone,
      Email: lead.email,
      Address: lead.address,
      LeadSource: lead.leadsource,
      Status: lead.status,
    }));

    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// ADD LEAD
// ==============================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          leadname: body.LeadName,
          company: body.Company,
          phone: body.Phone,
          email: body.Email,
          address: body.Address,
          leadsource: body.LeadSource,
          status: body.Status,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        {
          message: "Failed to add lead",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const lead = data[0];

    // ==========================
    // ADD ACTIVITY
    // ==========================
    await supabase.from("activities").insert([
      {
        title: "Lead Added",
        description: `${lead.leadname} added as a new lead`,
        module: "Sales",
      },
    ]);

    return NextResponse.json({
      LeadId: lead.leadid,
      LeadName: lead.leadname,
      Company: lead.company,
      Phone: lead.phone,
      Email: lead.email,
      Address: lead.address,
      LeadSource: lead.leadsource,
      Status: lead.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
