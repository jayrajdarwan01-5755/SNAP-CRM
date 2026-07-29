import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


// GET ALL OPPORTUNITIES

export async function GET() {

  try {

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("opportunityid", { ascending: true });


    if (error) {

      return NextResponse.json(
        {
          message: "Failed to fetch opportunities",
          error: error.message,
        },
        {
          status: 500,
        }
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
        message: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}




// ADD OPPORTUNITY

export async function POST(request: Request) {


  try {


    const body = await request.json();



    const { data, error } = await supabase
      .from("opportunities")
      .insert([

        {

          customer: body.Customer,

          opportunityname: body.OpportunityName,

          amount: body.Amount,

          stage: body.Stage,

          probability: body.Probability,

          closedate: body.CloseDate,

        }

      ])
      .select();




    if (error) {


      return NextResponse.json(

        {

          message: "Failed to add opportunity",

          error: error.message,

        },

        {

          status: 500,

        }

      );


    }




    const opportunity = data[0];



    return NextResponse.json({

      OpportunityId: opportunity.opportunityid,

      Customer: opportunity.customer,

      OpportunityName: opportunity.opportunityname,

      Amount: opportunity.amount,

      Stage: opportunity.stage,

      Probability: opportunity.probability,

      CloseDate: opportunity.closedate,

    });



  } catch (error) {


    return NextResponse.json(

      {

        message:"Server error",

      },

      {

        status:500,

      }

    );


  }


}
// UPDATE OPPORTUNITY

export async function PUT(request: Request) {

  try {

    const body = await request.json();



    const { data, error } = await supabase
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
      .select();



    if (error) {

      return NextResponse.json(

        {
          message: "Failed to update opportunity",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    const opportunity = data[0];



    return NextResponse.json({

      message: "Opportunity updated successfully",

      data: {

        OpportunityId: opportunity.opportunityid,

        Customer: opportunity.customer,

        OpportunityName: opportunity.opportunityname,

        Amount: opportunity.amount,

        Stage: opportunity.stage,

        Probability: opportunity.probability,

        CloseDate: opportunity.closedate,

      }

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

// DELETE OPPORTUNITY

export async function DELETE(request: Request) {

  try {

    const body = await request.json();



    const { error } = await supabase
      .from("opportunities")
      .delete()
      .eq("opportunityid", body.OpportunityId);



    if (error) {


      return NextResponse.json(

        {
          message: "Failed to delete opportunity",
          error: error.message,
        },

        {
          status: 500,
        }

      );


    }



    return NextResponse.json({

      message: "Opportunity deleted successfully",

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