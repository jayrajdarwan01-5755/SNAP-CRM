"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/types/product";

export default function EditProductPage() {

  const router = useRouter();
  const params = useParams();

  const productId = Number(params.id);

  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {

    const loadProduct = async () => {

      const response = await fetch("/api/products");

      const data: Product[] = await response.json();

      const product = data.find(
        (item) => item.ProductId === productId
      );

      if (product) {

        setProductCode(product.ProductCode);
        setProductName(product.ProductName);
        setCategory(product.Category);
        setPrice(product.Price.toString());
        setQuantity(product.Quantity.toString());
        setStatus(product.Status);

      }

    };

    loadProduct();

  }, [productId]);


  const handleUpdate = async () => {

    const response = await fetch("/api/products", {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        ProductId: productId,
        ProductCode: productCode,
        ProductName: productName,
        Category: category,
        Price: Number(price),
        Quantity: Number(quantity),
        Status: status,

      }),

    });


    const data = await response.json();

    console.log(data);

    alert("Product Updated Successfully");

    router.push("/inventory/products");

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            Edit Product

          </h1>


          <p className="text-muted mt-2">

            Update product information

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





      {/* Form */}


      <div className="card-theme border border-theme rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          {/* Product Code */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Product Code

            </label>


            <input

              type="text"

              value={productCode}

              onChange={(e) => setProductCode(e.target.value)}

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





          {/* Product Name */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Product Name

            </label>


            <input

              type="text"

              value={productName}

              onChange={(e) => setProductName(e.target.value)}

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





          {/* Category */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Category

            </label>


            <select

              value={category}

              onChange={(e) => setCategory(e.target.value)}

              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "

            >

              <option value="Electronics">
                Electronics
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Office Supplies">
                Office Supplies
              </option>


            </select>


          </div>





          {/* Price */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Price

            </label>


            <input

              type="number"

              value={price}

              onChange={(e) => setPrice(e.target.value)}

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





          {/* Quantity */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Quantity

            </label>


            <input

              type="number"

              value={quantity}

              onChange={(e) => setQuantity(e.target.value)}

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





          {/* Status */}


          <div>


            <label className="block text-sm font-semibold text-muted mb-2">

              Status

            </label>


            <select

              value={status}

              onChange={(e) => setStatus(e.target.value)}

              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "

            >

              <option value="Active">
                Active
              </option>


              <option value="Inactive">
                Inactive
              </option>


            </select>


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

            Update Product

          </button>


        </div>


      </div>


    </div>


  );


}