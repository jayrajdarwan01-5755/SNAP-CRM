"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


type Category = {

  CategoryId: number;
  CategoryName: string;
  Description: string;

};



export default function ViewCategoryPage() {


  const router = useRouter();

  const params = useParams();


  const id = Number(params.id);



  const [category, setCategory] = useState<Category | null>(null);




  useEffect(() => {


    const loadCategory = async () => {


      try {


        const response = await fetch("/api/categories");


        const data: Category[] = await response.json();



        const foundCategory = data.find(

          (item) =>

          item.CategoryId === id

        );



        setCategory(foundCategory || null);



      }

      catch(error){


        console.log(error);


      }


    };



    loadCategory();


  }, [id]);







  if (!category) {


    return (

      <div className="text-gray-700">

        Loading Category...

      </div>

    );


  }







  return (


    <div className="space-y-6">





      {/* Header */}


      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Category Details

          </h1>



          <p className="text-gray-600 mt-2">

            View category information

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
            {/* Category Information */}



      <div className="bg-white border rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Category Information

        </h2>




        <div className="grid grid-cols-1 gap-6">





          {/* Category Name */}



          <div>


            <p className="text-sm text-gray-500">

              Category Name

            </p>



            <p className="font-semibold text-gray-900">

              {category.CategoryName}

            </p>



          </div>






          {/* Description */}



          <div>


            <p className="text-sm text-gray-500">

              Description

            </p>



            <p className="font-semibold text-gray-900 whitespace-pre-line">

              {category.Description}

            </p>



          </div>





        </div>




      </div>





    </div>


  );


}