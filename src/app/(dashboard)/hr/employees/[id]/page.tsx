import Link from "next/link";


const product = {

  ProductId: 1,
  ProductCode: "PRD001",
  ProductName: "Dell Laptop",
  CategoryId: 101,
  Category: "Electronics",
  Description: "Dell Inspiron Laptop",
  Price: 65000,
  Quantity: 15,
  Unit: "Piece",
  SupplierId: 501,
  Supplier: "Dell Supplier",
  Status: "Active",

};



export default function ProductViewPage() {


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Product Details
          </h1>


          <p className="text-gray-600 mt-2">
            View product information
          </p>


        </div>



        <div className="flex gap-3">


          <Link

            href={`/inventory/products/edit/${product.ProductId}`}

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
            "

          >

            Edit

          </Link>



          <Link

            href="/inventory/products"

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

          </Link>


        </div>


      </div>





      {/* Product Information */}


      <div className="bg-white border rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold text-gray-900 mb-5">

          Product Information

        </h2>




        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">



          <div>

            <p className="text-gray-500">
              Product ID
            </p>

            <p className="font-semibold text-gray-900">
              {product.ProductId}
            </p>

          </div>




          <div>

            <p className="text-gray-500">
              Product Code
            </p>

            <p className="font-semibold text-gray-900">
              {product.ProductCode}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Product Name
            </p>

            <p className="font-semibold text-gray-900">
              {product.ProductName}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Category
            </p>

            <p className="font-semibold text-gray-900">
              {product.Category}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Description
            </p>

            <p className="font-semibold text-gray-900">
              {product.Description}
            </p>

          </div>



          <div>

            <p className="text-gray-500">
              Price
            </p>

            <p className="font-semibold text-gray-900">
              ₹{product.Price.toLocaleString("en-IN")}
            </p>

          </div>



        </div>


      </div>







      {/* Inventory Information */}


      <div className="bg-white border rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold text-gray-900 mb-5">

          Inventory Information

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">





          <div>

            <p className="text-gray-500">
              Category ID
            </p>

            <p className="font-semibold text-gray-900">
              {product.CategoryId}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Quantity
            </p>

            <p className="font-semibold text-gray-900">
              {product.Quantity}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Unit
            </p>

            <p className="font-semibold text-gray-900">
              {product.Unit}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Supplier ID
            </p>

            <p className="font-semibold text-gray-900">
              {product.SupplierId}
            </p>

          </div>





          <div>

            <p className="text-gray-500">
              Supplier
            </p>

            <p className="font-semibold text-gray-900">
              {product.Supplier}
            </p>

          </div>





          <div>

            <p className="text-gray-500 mb-2">
              Status
            </p>


            <span

              className={

                product.Status === "Active"

                ?

                "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                :

                "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

              }

            >

              {product.Status}

            </span>


          </div>



        </div>


      </div>



    </div>

  );

}