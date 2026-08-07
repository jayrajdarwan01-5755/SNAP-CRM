"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";


export default function SuppliersPage() {


  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");



  useEffect(() => {


    loadSuppliers();


  }, []);




  const handleClearFilter = () => {

    setSearchText("");

  };




  const filteredSuppliers = suppliers.filter((supplier) =>

    supplier.SupplierName
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    supplier.Email
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    supplier.Phone
      .toLowerCase()
      .includes(searchText.toLowerCase())

  );





  const loadSuppliers = async () => {


    try {


      setLoading(true);


      const response = await fetch("/api/suppliers");


      const data: Supplier[] = await response.json();


      setSuppliers(data);



    }

    catch(error){


      console.log(error);


    }

    finally{


      setLoading(false);


    }


  };






  const handleDelete = async (
    SupplierId:number
  ) => {



    const confirmDelete = confirm(
      "Are you sure you want to delete this supplier?"
    );



    if(!confirmDelete){

      return;

    }





    const response = await fetch(
      "/api/suppliers",
      {

        method:"DELETE",

        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify({

          SupplierId

        })

      }

    );





    if(response.ok){


      setSuppliers((prev)=>

        prev.filter(

          (supplier)=>

          supplier.SupplierId !== SupplierId

        )

      );


    }



  };





  return (


    <div className="space-y-6">





      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            Supplier Management

          </h1>


          <p className="text-muted mt-2">

            Manage suppliers

          </p>


        </div>






        <Link

          href="/inventory/suppliers/add"

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Add Supplier

        </Link>



      </div>







      {/* Search Section */}




      <div className="card-theme border border-theme rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          <input

            type="text"

            value={searchText}

            onChange={(e) => setSearchText(e.target.value)}

            placeholder="Search Supplier"

            className="
            w-full
            border
            border-theme
            bg-theme
            text-theme
            placeholder:text-muted
            rounded-lg
            px-4
            py-2
            "

          />



          <button

            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            "

          >

            Search

          </button>



          <button

            onClick={handleClearFilter}

            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            "

          >

            Clear

          </button>



        </div>


      </div>








      {/* Supplier Table */}



      <div className="card-theme border border-theme rounded-xl shadow overflow-hidden">



        <table className="w-full">



          <thead className="bg-theme">



            <tr className="text-theme">



              <th className="px-4 py-3 text-left">

                Supplier Name

              </th>



              <th className="px-4 py-3 text-left">

                Email

              </th>



              <th className="px-4 py-3 text-left">

                Phone

              </th>



              <th className="px-4 py-3 text-left">

                Address

              </th>



              <th className="px-4 py-3 text-center">

                Action

              </th>



            </tr>



          </thead>






          <tbody>



          {

            loading ? (



              <tr>



                <td

                  colSpan={5}

                  className="text-center py-10 text-muted"

                >

                  Loading suppliers...



                </td>



              </tr>



            )



            :



            filteredSuppliers.length === 0 ? (


              <tr>


                <td

                  colSpan={5}

                  className="text-center py-10 text-muted"

                >

                  No suppliers found



                </td>



              </tr>



            )



            :



            filteredSuppliers.map((supplier) => (



              <tr


                key={supplier.SupplierId}


                className="
                border-t
                border-theme
                hover:bg-theme
                table-row-theme
                "


              >






                <td className="px-4 py-4 font-medium text-theme">


                  {supplier.SupplierName}


                </td>








                <td className="px-4 py-4 text-muted">


                  {supplier.Email}


                </td>








                <td className="px-4 py-4 text-muted">


                  {supplier.Phone}


                </td>








                <td className="px-4 py-4 text-muted">


                  {supplier.Address}


                </td>








                <td className="px-4 py-4">


                  <div className="flex justify-center gap-2">






                    <Link

                      href={`/inventory/suppliers/${supplier.SupplierId}`}

                      className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "

                    >

                      View


                    </Link>








                    <Link

                      href={`/inventory/suppliers/edit/${supplier.SupplierId}`}

                      className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "

                    >

                      Edit


                    </Link>








                    <button


                      onClick={() =>
                        handleDelete(supplier.SupplierId)
                      }


                      className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "


                    >

                      Delete


                    </button>






                  </div>


                </td>




              </tr>



            ))



          }



          </tbody>



        </table>



      </div>





    </div>


  );


}