import { NextResponse } from "next/server";
import { Lead } from "@/types/lead";


let leads: Lead[] = [

  {
    LeadId: 1,
    LeadName: "Rahul Sharma",
    Company: "ABC Technologies",
    Phone: "9876543210",
    Email: "rahul@abc.com",
    Address: "Mumbai, Maharashtra",
    LeadSource: "Website",
    Status: "New",
  },

  {
    LeadId: 2,
    LeadName: "Priya Verma",
    Company: "XYZ Solutions",
    Phone: "9876501234",
    Email: "priya@xyz.com",
    Address: "Delhi",
    LeadSource: "LinkedIn",
    Status: "Contacted",
  },

];


// GET ALL LEADS

export async function GET(){

  return NextResponse.json(leads);

}


// ADD LEAD

export async function POST(request: Request){

  const body: Lead = await request.json();


  const newLead = {

    ...body,

    LeadId: Date.now(),

  };


  leads.push(newLead);


  return NextResponse.json(newLead);

}


// UPDATE LEAD

export async function PUT(request: Request){

  const body: Lead = await request.json();


  leads = leads.map((lead)=>

    lead.LeadId === body.LeadId
      ? body
      : lead

  );


  return NextResponse.json({

    message:"Lead updated successfully"

  });

}


// DELETE LEAD

export async function DELETE(request: Request){

  const body = await request.json();


  leads = leads.filter(

    (lead)=>
      lead.LeadId !== body.LeadId

  );


  return NextResponse.json({

    message:"Lead deleted successfully"

  });

}