import {
  Users,
  UserPlus,
  Package,
  UserRound,
  Activity,
  Link as LinkIcon,
  BarChart3
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome to SNAP CRM
        </p>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

  <div className="flex justify-between items-center">

    <div>
      <p className="text-gray-700 font-semibold text-sm">
        Total Employees
      </p>

      <h2 className="text-3xl font-bold mt-3 text-gray-900">
        120
      </h2>
    </div>

    <Users className="text-blue-600" size={40} />

  </div>
</div>

<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 font-semibold text-sm">
       Total Leads
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900">
       350
      </h2>
    </div>
    <UserPlus className="text-green-600" size={40} />
  </div>
</div>


<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 font-semibold text-sm">
        Products
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900">
       800
      </h2>
    </div>
  <Package className="text-purple-600" size={40} />
  </div>
</div>


<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 font-semibold text-sm">
        Customers
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900">
       95
      </h2>
    </div>
  <UserRound className="text-orange-600" size={40} />
  </div>
</div>
      </div>


      {/* Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

         <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activities
          </h2>


          <ul className="space-y-3">

            <li>
             <a className="text-blue-700 font-medium hover:underline cursor-pointer">
                New employee added
              </a>
            </li>


            <li>
             <a className="text-blue-700 font-medium hover:underline cursor-pointer">
                New lead created
              </a>
            </li>


            <li>
             <a className="text-blue-700 font-medium hover:underline cursor-pointer">
                Product updated
              </a>
            </li>


            <li>
            <a className="text-blue-700 font-medium hover:underline cursor-pointer">
                Customer registered
              </a>
            </li>

          </ul>

        </div>



        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Links
          </h2>


          <div className="space-y-3">

            <a
              href="/hr/employees"
              className="block text-blue-600 hover:underline"
            >
              Manage Employees →
            </a>


            <a
              href="/sales/leads"
              className="block text-blue-600 hover:underline"
            >
              View Leads →
            </a>


            <a
              href="/inventory/products"
              className="block text-blue-600 hover:underline"
            >
              Manage Products →
            </a>


            <a
              href="/sales/customers"
              className="block text-blue-600 hover:underline"
            >
              Manage Customers →
            </a>

          </div>

        </div>


      </div>



      {/* Charts */}
      <div className="bg-white rounded-xl shadow border p-6">

       <h2 className="text-xl font-bold text-gray-900 mb-4">
          Charts
        </h2>


        <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">

          <p className="text-gray-500">
            Chart will appear here
          </p>

        </div>

      </div>


    </div>
  );
}