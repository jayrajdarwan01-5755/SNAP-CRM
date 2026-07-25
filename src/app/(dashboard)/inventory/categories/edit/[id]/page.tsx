"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


type Category = {

  CategoryId: number;

  CategoryName: string;

  Description: string;

};




export default function EditCategoryPage() {


  const router = useRouter();

  const params = useParams();


  const id = Number(params.id);





  const [categoryName, setCategoryName] = useState("");

  const [description, setDescription] = useState("");





  useEffect(()=>{


    const loadCategory = async()=>{


      const response = await fetch("/api/categories");


      const data:Category[] = await response.json();




      const foundCategory = data.find(

        (item)=>

        item.CategoryId === id

      );




      if(foundCategory){


        setCategoryName(foundCategory.CategoryName);

        setDescription(foundCategory.Description);


      }



    };



    loadCategory();



  },[id]);







  const handleUpdate = async()=>{


    const response = await fetch("/api/categories",{


      method:"PUT",


      headers:{


        "Content-Type":"application/json",


      },


      body:JSON.stringify({


        CategoryId:id,


        CategoryName:categoryName,


        Description:description,


      }),


    });




    if(response.ok){


      alert("Category Updated Successfully");


      router.push("/inventory/categories");


    }

    else{


      alert("Failed to update category");


    }



  };






  return (


    <div className="space-y-6">


      {/* Header */}


      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Edit Category

          </h1>



          <p className="text-gray-600 mt-2">

            Update category information

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


      <div className="bg-white border rounded-xl shadow p-6">



        <div className="grid grid-cols-1 gap-6">





          {/* Category Name */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Category Name

            </label>



            <input


              type="text"


              value={categoryName}


              onChange={(e)=>
                setCategoryName(e.target.value)
              }


              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "


            />



          </div>







          {/* Description */}



          <div>



            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Description

            </label>





            <textarea


              rows={4}


              value={description}


              onChange={(e)=>
                setDescription(e.target.value)
              }



              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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


            Update Category


          </button>





        </div>






      </div>





    </div>


  );


}