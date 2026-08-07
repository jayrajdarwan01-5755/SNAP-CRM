"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Opportunity } from "@/types/opportunity";


export default function EditOpportunityPage() {


  const router = useRouter();

  const params = useParams();

  const opportunityId = Number(params.id);




  const [opportunityName, setOpportunityName] = useState("");

  const [customer, setCustomer] = useState("");

  const [amount, setAmount] = useState("");

  const [stage, setStage] = useState("");

  const [probability, setProbability] = useState("");

  const [closeDate, setCloseDate] = useState("");





  useEffect(()=>{


    const loadOpportunity = async()=>{


      const response = await fetch("/api/opportunities");


      const data: Opportunity[] = await response.json();



      const opportunity = data.find(

        (item)=>

        item.OpportunityId === opportunityId

      );



      if(opportunity){


        setOpportunityName(
          opportunity.OpportunityName
        );


        setCustomer(
          opportunity.Customer
        );


        setAmount(
          String(opportunity.Amount)
        );


        setStage(
          opportunity.Stage
        );


        setProbability(
          opportunity.Probability
        );


        setCloseDate(
          opportunity.CloseDate
        );


      }



    };


    loadOpportunity();


  },[opportunityId]);








  const handleUpdate = async()=>{


    const response = await fetch(
      "/api/opportunities",
      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json",
        },


        body:JSON.stringify({

          OpportunityId: opportunityId,

          OpportunityName: opportunityName,

          Customer: customer,

          Amount:Number(amount),

          Stage:stage,

          Probability:probability,

          CloseDate:closeDate,

        }),

      }
    );



    const data = await response.json();


    console.log(data);



    alert(
      "Opportunity Updated Successfully"
    );


    router.push(
      "/sales/opportunities"
    );


  };








  return (


    <div className="space-y-6">



      {/* Header */}


      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-theme">

            Edit Opportunity

          </h1>


          <p className="text-muted mt-2">

            Update opportunity information

          </p>


        </div>





        <button

          onClick={()=>router.back()}

          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          Back

        </button>



      </div>








      {/* Form */}



      <div className="card-theme border border-theme rounded-xl shadow p-6">



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">







          {/* Opportunity Name */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Opportunity Name

            </label>



            <input

              type="text"

              value={opportunityName}

              onChange={(e)=>
                setOpportunityName(e.target.value)
              }


className="
w-full
border
border-theme
bg-theme
text-theme
rounded-lg
px-4
py-2
"

            />


          </div>


          {/* Customer */}
          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

              Customer

            </label>

            <input

              type="text"

              value={customer}

              onChange={(e)=>
                setCustomer(e.target.value)
              }


className="
w-full
border
border-theme
bg-theme
text-theme
rounded-lg
px-4
py-2
"

            />

          </div>


          {/* Amount */}


          <div>
            <label className="block text-sm font-semibold text-theme mb-2">

              Amount
            </label>

        <input

              type="number"

              value={amount}

              onChange={(e)=>
                setAmount(e.target.value)
              }


              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />
          </div>

          {/* Stage */}
          <div>
            <label className="block text-sm font-semibold text-theme mb-2">

              Stage

            </label>



            <select

              value={stage}

              onChange={(e)=>
                setStage(e.target.value)
              }


                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "
            >

              <option>Prospecting</option>

              <option>Proposal</option>

              <option>Negotiation</option>

              <option>Won</option>

              <option>Lost</option>

            </select>
          </div>

          {/* Probability */}
          <div>
            <label className="block text-sm font-semibold text-theme mb-2">

              Probability

            </label>
            <input

              type="text"

              value={probability}

              onChange={(e)=>
                setProbability(e.target.value)
              }


                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />
          </div>

          {/* Close Date */}
          <div>
            <label className="block text-sm font-semibold text-theme mb-2">

              Expected Close Date

            </label>

            <input

              type="date"

              value={closeDate}

              onChange={(e)=>
                setCloseDate(e.target.value)
              }


              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />

          </div>
        </div>

        {/* Update Button */}
        <div className="mt-8 flex justify-end">
          <button

            onClick={handleUpdate}


            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "

          >
            Update Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}