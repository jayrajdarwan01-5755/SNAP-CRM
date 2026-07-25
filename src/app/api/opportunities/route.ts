import { NextResponse } from "next/server";
import { Opportunity } from "@/types/opportunity";


let opportunities: Opportunity[] = [

  {
    OpportunityId: 1,
    Customer: "ABC Technologies",
    OpportunityName: "CRM Software Deal",
    Amount: 250000,
    Stage: "Proposal",
    Probability: "70%",
    CloseDate: "2026-08-30",
  },


  {
    OpportunityId: 2,
    Customer: "XYZ Solutions",
    OpportunityName: "ERP Implementation",
    Amount: 500000,
    Stage: "Negotiation",
    Probability: "80%",
    CloseDate: "2026-09-15",
  },


  {
    OpportunityId: 3,
    Customer: "Tech World",
    OpportunityName: "Cloud Service Contract",
    Amount: 150000,
    Stage: "Prospecting",
    Probability: "40%",
    CloseDate: "2026-10-20",
  },

];




// GET ALL OPPORTUNITIES

export async function GET() {


  return NextResponse.json(opportunities);


}





// ADD OPPORTUNITY

export async function POST(request: Request) {


  const body: Opportunity = await request.json();



  const newOpportunity = {

    ...body,

    OpportunityId: Date.now(),

  };



  opportunities.push(newOpportunity);



  return NextResponse.json(newOpportunity);


}






// UPDATE OPPORTUNITY

export async function PUT(request: Request) {


  const body: Opportunity = await request.json();



  opportunities = opportunities.map((opportunity)=>


    opportunity.OpportunityId === body.OpportunityId

    ?

    body

    :

    opportunity


  );




  return NextResponse.json({

    message:"Opportunity updated successfully"

  });


}







// DELETE OPPORTUNITY

export async function DELETE(request: Request) {


  const body = await request.json();



  opportunities = opportunities.filter(

    (opportunity)=>

    opportunity.OpportunityId !== body.OpportunityId


  );




  return NextResponse.json({

    message:"Opportunity deleted successfully"

  });


}