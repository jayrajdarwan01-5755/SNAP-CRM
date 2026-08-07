"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddOpportunityPage() {

  const router = useRouter();


  const [opportunityName, setOpportunityName] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("Prospecting");
  const [probability, setProbability] = useState("");
  const [closeDate, setCloseDate] = useState("");



 const handleSave = async () => {


  const response = await fetch("/api/opportunities", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },


    body: JSON.stringify({

      OpportunityName: opportunityName,

      Customer: customer,

      Amount: Number(amount),

      Stage: stage,

      Probability: probability,

      CloseDate: closeDate,

    }),

  });




  if(response.ok){


    alert("Opportunity Added Successfully");


    router.push("/sales/opportunities");


  }


};



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-theme">
            Add Opportunity
          </h1>


          <p className="text-muted mt-2">
            Create new sales opportunity
          </p>

        </div>



        <button
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
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
              onChange={(e)=>setOpportunityName(e.target.value)}
              placeholder="Enter Opportunity Name"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                text-placeholder
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
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
              onChange={(e)=>setCustomer(e.target.value)}
              placeholder="Enter Customer Name"
                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                text-placeholder
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
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
              onChange={(e)=>setAmount(e.target.value)}
              placeholder="Enter Amount"
                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
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
              onChange={(e)=>setStage(e.target.value)}
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
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
              onChange={(e)=>setProbability(e.target.value)}
              placeholder="Example: 70%"
                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                text-placeholder
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
            />


          </div>





          {/* Expected Close Date */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Expected Close Date
            </label>


            <input
              type="date"
              value={closeDate}
              onChange={(e)=>setCloseDate(e.target.value)}
                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
            />


          </div>


        </div>





        {/* Save Button */}

        <div className="mt-8 flex justify-end">


          <button
            onClick={handleSave}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "
          >

            Save Opportunity

          </button>


        </div>


      </div>


    </div>

  );


}