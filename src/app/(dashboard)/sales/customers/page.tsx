"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";

export default function CustomersPage() {
const [customers, setCustomers] = useState<Customer[]>([]);
const [searchText, setSearchText] = useState("");
const [selectedCity, setSelectedCity] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const customersPerPage = 5;

useEffect(() => {

  const loadCustomers = async () => {

    try {

      setLoading(true);

      const response = await fetch("/api/customers");

      const data: Customer[] = await response.json();

      setCustomers(data);


    }
    catch(error){

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };


  loadCustomers();

}, []);


const handleDelete = async (CustomerId: number) => {


  const confirmDelete = confirm(
    "Are you sure you want to delete this customer?"
  );


  if (!confirmDelete) {
    return;
  }

  const response = await fetch("/api/customers", {

    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      CustomerId,
    }),

  });



  const result = await response.json();


  console.log(result);



  if(response.ok){

    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.CustomerId !== CustomerId
      )
    );

  }
};

 const handleClearFilter = () => {

  setSearchText("");
  setSelectedCity("");
  setSelectedStatus("");

};

const filteredCustomers = customers.filter((customer: Customer) => {


  const searchMatch =

    customer.CustomerName
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    customer.CustomerCode
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    customer.Email
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    customer.Phone.includes(searchText);



  const cityMatch =

    selectedCity === ""

    ||

    customer.City === selectedCity;



  const statusMatch =

    selectedStatus === ""

    ||

    customer.Status === selectedStatus;




  return searchMatch && cityMatch && statusMatch;
});


  const lastCustomerIndex = currentPage * customersPerPage;

const firstCustomerIndex =
  lastCustomerIndex - customersPerPage;

const currentCustomers =
  filteredCustomers.slice(
    firstCustomerIndex,
    lastCustomerIndex
  );


  return (

    <div className="space-y-6">


      {/* Header */}
      <div className="flex justify-between items-center">

        <div>

        <h1 className="text-3xl font-bold text-theme">
            Customer Management
          </h1>

        <p className="text-muted mt-2">
            Manage customer records 
          </p>


        </div>





        <Link

          href="/sales/customers/add"

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Add Customer

        </Link>
      </div>


      {/* Search Section */}

<div className="card-theme border border-theme rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <input

            value={searchText}

            onChange={(e)=>
            setSearchText(e.target.value)
            }

            placeholder="Search Customer"

            className="
            border
            border-theme
            bg-theme
            text-theme
            rounded-lg
            px-4
            py-2
            "

            />

         <select

            value={selectedCity}

            onChange={(e)=>
            setSelectedCity(e.target.value)
            }

            className="
            border
            border-theme
            bg-theme
            text-theme
            rounded-lg
            px-4
            py-2
            "
            >

            <option value="">
            All City
            </option>


           <option value="Mumbai">
            Mumbai
            </option>


            <option value="Pune">
            Pune
            </option>


            <option value="Delhi">
            Delhi
            </option>

          </select>


          <select

            value={selectedStatus}

            onChange={(e)=>
            setSelectedStatus(e.target.value)
            }

            className="
            border
            border-theme
            bg-theme
            text-theme
            rounded-lg
            px-4
            py-2
            "
            >


          <option value="">
            All Status
            </option>

           <option value="Active">
            Active
            </option>


            <option value="Inactive">
            Inactive
            </option>


          </select>







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

            {/* Customer Table */}


      <div className="card-theme border border-theme rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-theme border-b border-theme">


            <tr className="text-theme">


              <th className="px-3 py-3 text-left">
                Customer Code
              </th>


              <th className="px-3 py-3 text-left">
                Customer Name
              </th>


              <th className="px-3 py-3 text-left">
                City
              </th>


              <th className="px-3 py-3 text-left">
                Phone
              </th>


              <th className="px-3 py-3 text-left">
                Email
              </th>


              <th className="px-3 py-3 text-left">
                Status
              </th>


              <th className="px-3 py-3 text-center">
                Action
              </th>


            </tr>


          </thead>



        <tbody>

            {
            loading ? (

            <tr>

            <td
            colSpan={7}
            className="text-center py-10 text-muted"
            >

            Loading customers...

            </td>

            </tr>

            )

            :

            filteredCustomers.length === 0 ? (

            <tr>

            <td
            colSpan={7}
            className="text-center py-10 text-muted"
            >

            No customers found

            </td>

            </tr>

            )

            :

           currentCustomers.map((customer) => (

            <tr
            key={customer.CustomerId}
            className="border-t border-theme hover:bg-theme table-row-theme transition-colors"
            >



  {/* Customer Code */}

  <td className="px-3 py-4 text-theme">
    {customer.CustomerCode}
  </td>



  {/* Customer Name */}

  <td className="px-3 py-4 font-medium text-theme">
    {customer.CustomerName}
  </td>




  {/* City */}

  <td className="px-3 py-4 text-muted">
    {customer.City}
  </td>





  {/* Phone */}

  <td className="px-3 py-4 text-muted">
    {customer.Phone}
  </td>





  {/* Email */}

  <td className="px-3 py-4 text-muted">
    {customer.Email}
  </td>





  {/* Status */}

  <td className="px-3 py-4">


    <span

      className={
        customer.Status === "Active"
        ?
        "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
        :
        "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
      }

    >

      {customer.Status}

    </span>


  </td>





  {/* Action */}

  <td className="px-3 py-4">


    <div className="flex justify-center gap-2">



      <Link

        href={`/sales/customers/${customer.CustomerId}`}

        className="
        bg-green-600
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

        href={`/sales/customers/edit/${customer.CustomerId}`}

        className="
        bg-blue-600
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

        onClick={() => handleDelete(customer.CustomerId)}

        className="
        bg-red-600
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




))}


</tbody>



        </table>


      </div>



    </div>

  );

}