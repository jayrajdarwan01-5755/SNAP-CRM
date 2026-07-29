"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


import {
  Users,
  UserPlus,
  Package,
  UserRound,
} from "lucide-react";



interface Activity {

  id:number;
  title:string;
  module:string;
  date:string;

}



interface DashboardData {

  employees:number;
  leads:number;
  products:number;
  customers:number;
  activities:Activity[];

}




export default function DashboardPage(){


  const { themeSettings } = useTheme();



  const [dashboard,setDashboard] = useState<DashboardData>({

    employees:0,
    leads:0,
    products:0,
    customers:0,
    activities:[]

  });



  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    loadDashboard();

  },[]);




  const loadDashboard = async()=>{


    try{


      const response = await fetch("/api/dashboard");


      const result = await response.json();


      setDashboard(result.data);



    }
    catch(error){

      console.error(
        "Dashboard Error",
        error
      );

    }
    finally{

      setLoading(false);

    }


  };





  const chartData = [

    {
      name:"Employees",
      value:dashboard.employees
    },

    {
      name:"Leads",
      value:dashboard.leads
    },

    {
      name:"Products",
      value:dashboard.products
    },

    {
      name:"Customers",
      value:dashboard.customers
    }

  ];




  const pieColors = [

    themeSettings.primaryColor,
    "#22c55e",
    "#a855f7",
    "#f97316"

  ];





  if(loading){

    return (

      <div className="p-6 font-semibold">
        Loading Dashboard...
      </div>

    );

  }




  return (


<div
className="space-y-6"
style={{
color:themeSettings.textColor
}}
>


{/* Header */}

<div>


<h1
className="text-3xl font-bold"
style={{
color:themeSettings.textColor
}}
>
Dashboard
</h1>


<p
className="mt-2"
style={{
color:themeSettings.textColor
}}
>
Welcome to SNAP CRM
</p>


</div>





{/* Cards */}


<div className="grid grid-cols-1 md:grid-cols-4 gap-6">



<div
className="rounded-xl shadow-md border p-6"
style={{
backgroundColor:themeSettings.backgroundColor,
borderColor:themeSettings.primaryColor
}}
>


<div className="flex justify-between">


<div>

<p className="font-semibold text-sm">
Total Employees
</p>


<h2 className="text-3xl font-bold mt-3">
{dashboard.employees}
</h2>


</div>


<Users
size={40}
style={{
color:themeSettings.primaryColor
}}
/>


</div>


</div>





<div
className="rounded-xl shadow-md border p-6"
style={{
backgroundColor:themeSettings.backgroundColor,
borderColor:themeSettings.primaryColor
}}
>


<div className="flex justify-between">


<div>

<p className="font-semibold text-sm">
Total Leads
</p>


<h2 className="text-3xl font-bold mt-3">
{dashboard.leads}
</h2>


</div>


<UserPlus
size={40}
style={{
color:themeSettings.primaryColor
}}
/>


</div>


</div>





<div
className="rounded-xl shadow-md border p-6"
style={{
backgroundColor:themeSettings.backgroundColor,
borderColor:themeSettings.primaryColor
}}
>


<div className="flex justify-between">


<div>

<p className="font-semibold text-sm">
Products
</p>


<h2 className="text-3xl font-bold mt-3">
{dashboard.products}
</h2>


</div>


<Package
size={40}
style={{
color:themeSettings.primaryColor
}}
/>


</div>


</div>
      <div
        className="rounded-xl shadow-md border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >

        <div className="flex justify-between">


          <div>

            <p className="font-semibold text-sm">
              Customers
            </p>


            <h2 className="text-3xl font-bold mt-3">
              {dashboard.customers}
            </h2>


          </div>


          <UserRound
            size={40}
            style={{
              color: themeSettings.primaryColor,
            }}
          />


        </div>


      </div>


    </div>





    {/* Activity + Quick Links */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



      {/* Recent Activities */}

      <div
        className="rounded-xl shadow-md border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >


        <h2 className="text-xl font-bold mb-4">
          Recent Activities
        </h2>



        <ul className="space-y-3">


          {
            dashboard.activities.map((activity)=>(


              <li
                key={activity.id}
                className="border-b pb-2"
              >


                <p
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                  className="font-medium"
                >
                  {activity.title}
                </p>


                <p className="text-sm opacity-70">
                  {activity.module} - {activity.date}
                </p>


              </li>


            ))
          }


        </ul>


      </div>







      {/* Quick Links */}


      <div
        className="rounded-xl shadow-md border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >


        <h2 className="text-xl font-bold mb-4">
          Quick Links
        </h2>



        <div className="space-y-3">


          <a
            href="/hr/employees"
            style={{
              color: themeSettings.primaryColor,
            }}
            className="block hover:underline"
          >
            Manage Employees →
          </a>



          <a
            href="/sales/leads"
            style={{
              color: themeSettings.primaryColor,
            }}
            className="block hover:underline"
          >
            View Leads →
          </a>



          <a
            href="/inventory/products"
            style={{
              color: themeSettings.primaryColor,
            }}
            className="block hover:underline"
          >
            Manage Products →
          </a>



          <a
            href="/sales/customers"
            style={{
              color: themeSettings.primaryColor,
            }}
            className="block hover:underline"
          >
            Manage Customers →
          </a>



        </div>


      </div>


    </div>







    {/* Charts */}



    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



      {/* Bar Chart */}


      <div
        className="rounded-xl shadow border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >


        <h2 className="text-xl font-bold mb-4">
          CRM Statistics
        </h2>



        <ResponsiveContainer
          width="100%"
          height={300}
        >


          <BarChart data={chartData}>


            <XAxis dataKey="name"/>


            <YAxis/>


            <Tooltip/>


            <Bar
              dataKey="value"
              fill={themeSettings.primaryColor}
            />


          </BarChart>


        </ResponsiveContainer>


      </div>








      {/* Pie Chart */}



      <div
        className="rounded-xl shadow border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >


        <h2 className="text-xl font-bold mb-4">
          Module Distribution
        </h2>




        <ResponsiveContainer
          width="100%"
          height={300}
        >


          <PieChart>


            <Pie

              data={chartData}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="50%"

              outerRadius={100}

              label

            >


              {
                chartData.map((item,index)=>(

                  <Cell
                    key={index}
                    fill={pieColors[index]}
                  />

                ))
              }


            </Pie>


            <Tooltip/>


          </PieChart>



        </ResponsiveContainer>


      </div>



    </div>



  </div>

  );

}