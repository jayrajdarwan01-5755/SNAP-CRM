import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// ========================
// GET OPPORTUNITIES
// ========================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // ========================
    // GET SINGLE OPPORTUNITY
    // ========================

    if (id) {
      const { data, error } = await supabaseServer
        .from("opportunities")
        .select("*")
        .eq("opportunityid", Number(id))
        .single();

      if (error) {
        return NextResponse.json(
          { message: error.message },
          { status: 404 }
        );
      }

      return NextResponse.json({
        OpportunityId: data.opportunityid,
        Customer: data.customer,
        OpportunityName: data.opportunityname,
        Amount: data.amount,
        Stage: data.stage,
        Probability: data.probability,
        CloseDate: data.closedate,
      });
    }

    // ========================
    // GET ALL OPPORTUNITIES
    // ========================

    const { data, error } = await supabaseServer
      .from("opportunities")
      .select("*")
      .order("opportunityid", { ascending: true });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    const opportunities = data.map((item) => ({
      OpportunityId: item.opportunityid,
      Customer: item.customer,
      OpportunityName: item.opportunityname,
      Amount: item.amount,
      Stage: item.stage,
      Probability: item.probability,
      CloseDate: item.closedate,
    }));

    return NextResponse.json(opportunities);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch opportunities",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// ADD OPPORTUNITY
// ========================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("opportunities")
      .insert([
        {
          customer: body.Customer,
          opportunityname: body.OpportunityName,
          amount: body.Amount,
          stage: body.Stage,
          probability: body.Probability,
          closedate: body.CloseDate,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Opportunity added successfully",
      opportunity: {
        OpportunityId: data.opportunityid,
        Customer: data.customer,
        OpportunityName: data.opportunityname,
        Amount: data.amount,
        Stage: data.stage,
        Probability: data.probability,
        CloseDate: data.closedate,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to add opportunity",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
// ========================
// UPDATE OPPORTUNITY
// ========================

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("opportunities")
      .update({
        customer: body.Customer,
        opportunityname: body.OpportunityName,
        amount: body.Amount,
        stage: body.Stage,
        probability: body.Probability,
        closedate: body.CloseDate,
      })
      .eq("opportunityid", body.OpportunityId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Opportunity updated successfully",
      opportunity: {
        OpportunityId: data.opportunityid,
        Customer: data.customer,
        OpportunityName: data.opportunityname,
        Amount: data.amount,
        Stage: data.stage,
        Probability: data.probability,
        CloseDate: data.closedate,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update opportunity",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// DELETE OPPORTUNITY
// ========================

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { error } = await supabaseServer
      .from("opportunities")
      .delete()
      .eq("opportunityid", body.OpportunityId);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete opportunity",
        error,
      },
      {
        status: 500,
      }
    );
  }
}