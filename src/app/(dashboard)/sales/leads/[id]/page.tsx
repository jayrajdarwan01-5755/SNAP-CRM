"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


type Lead = {

  LeadId: number;
  LeadName: string;
  Company: string;
  Phone: string;
  Email: string;
  Address: string;
  LeadSource: string;
  Status: string;

};



export default function ViewLeadPage() {


  const router = useRouter();


  const params = useParams();


  const id = Number(params.id);



  const [lead, setLead] = useState<Lead | null>(null);



  useEffect(() => {


    const loadLead = async () => {


      const response = await fetch("/api/leads");


      const data: Lead[] = await response.json();



      const foundLead = data.find(

        (item) =>

          item.LeadId === id

      );



      setLead(foundLead || null);



    };



    loadLead();



  }, [id]);





  if (!lead) {


    return (

      <div>

        Loading Lead...

      </div>

    );


  }




  return (


    <div className="space-y-6">



      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Lead Details

          </h1>


          <p className="text-gray-600 mt-2">

            View lead information

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





      {/* Lead Information */}



      <div className="bg-white border rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Lead Information

        </h2>




        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          {/* Lead Name */}


          <div>

            <p className="text-sm text-gray-500">

              Lead Name

            </p>


            <p className="font-semibold text-gray-900">

              {lead.LeadName}

            </p>


          </div>




          {/* Company */}


          <div>

            <p className="text-sm text-gray-500">

              Company

            </p>


            <p className="font-semibold text-gray-900">

              {lead.Company}

            </p>


          </div>





          {/* Phone */}


          <div>

            <p className="text-sm text-gray-500">

              Phone

            </p>


            <p className="font-semibold text-gray-900">

              {lead.Phone}

            </p>


          </div>





          {/* Email */}


          <div>

            <p className="text-sm text-gray-500">

              Email

            </p>


            <p className="font-semibold text-gray-900">

              {lead.Email}

            </p>


          </div>
          
          {/* Address */}


          <div>

            <p className="text-sm text-gray-500">

              Address

            </p>


            <p className="font-semibold text-gray-900">

              {lead.Address}

            </p>


          </div>





          {/* Lead Source */}


          <div>

            <p className="text-sm text-gray-500">

              Lead Source

            </p>


            <p className="font-semibold text-gray-900">

              {lead.LeadSource}

            </p>


          </div>





          {/* Status */}


          <div>


            <p className="text-sm text-gray-500 mb-2">

              Status

            </p>



            <span

              className={

                lead.Status === "New"

                ?

                "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"

                :

                lead.Status === "Contacted"

                ?

                "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"

                :

                lead.Status === "Qualified"

                ?

                "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                :

                "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

              }

            >

              {lead.Status}

            </span>


          </div>





        </div>



      </div>



    </div>


  );


}