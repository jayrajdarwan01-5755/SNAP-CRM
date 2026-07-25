"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunity";


export default function ViewOpportunityPage() {


  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);



  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);



  useEffect(() => {


    const loadOpportunity = async () => {


      const response = await fetch("/api/opportunities");


      const data: Opportunity[] = await response.json();



      const foundOpportunity = data.find(

        (item) =>

        item.OpportunityId === id

      );



      setOpportunity(foundOpportunity || null);


    };



    loadOpportunity();


  }, [id]);





  if (!opportunity) {


    return (

      <div className="text-center py-10 text-gray-600">

        Loading Opportunity...

      </div>

    );

  }






  return (


    <div className="space-y-6">



      {/* Header */}


      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Opportunity Details

          </h1>



          <p className="text-gray-600 mt-2">

            View opportunity information

          </p>


        </div>






        <button

          onClick={() => router.back()}

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









      {/* Opportunity Information */}



      <div className="bg-white border rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Opportunity Information

        </h2>







        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





          {/* Opportunity Name */}


          <div>

            <p className="text-sm text-gray-500">

              Opportunity Name

            </p>


            <p className="font-semibold text-gray-900">

              {opportunity.OpportunityName}

            </p>


          </div>







          {/* Customer */}


          <div>

            <p className="text-sm text-gray-500">

              Customer

            </p>


            <p className="font-semibold text-gray-900">

              {opportunity.Customer}

            </p>


          </div>







          {/* Amount */}


          <div>

            <p className="text-sm text-gray-500">

              Amount

            </p>


            <p className="font-semibold text-green-700">

              ₹
              {new Intl.NumberFormat("en-IN")
              .format(opportunity.Amount)}

            </p>


          </div>








          {/* Stage */}


          <div>


            <p className="text-sm text-gray-500 mb-2">

              Stage

            </p>



            <span

            className={


              opportunity.Stage === "Won"

              ?

              "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"


              :


              opportunity.Stage === "Lost"

              ?

              "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"


              :


              "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"


            }


            >


              {opportunity.Stage}


            </span>



          </div>









          {/* Probability */}


          <div>

            <p className="text-sm text-gray-500">

              Probability

            </p>


            <p className="font-semibold text-gray-900">

              {opportunity.Probability}

            </p>


          </div>









          {/* Close Date */}


          <div>


            <p className="text-sm text-gray-500">

              Expected Close Date

            </p>


            <p className="font-semibold text-gray-900">

              {opportunity.CloseDate}

            </p>


          </div>







        </div>





      </div>





    </div>


  );


}