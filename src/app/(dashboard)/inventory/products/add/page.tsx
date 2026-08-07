"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {

  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);

  const [product, setProduct] = useState({

    productCode: "",
    productName: "",
    category: "",
    price: "",
    quantity: "",
    status: "Active",

  });


  useEffect(() => {

    loadCategories();

  }, []);



  const loadCategories = async () => {

    try {

      const response = await fetch("/api/categories");

      const data = await response.json();

      setCategories(data);

    } catch(error) {

      console.log(error);

    }

  };



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {


    setProduct({

      ...product,

      [e.target.name]: e.target.value,

    });


  };




  const handleSubmit = async (e: React.FormEvent) => {


    e.preventDefault();



    if (

      !product.productCode ||

      !product.productName ||

      !product.category ||

      !product.price ||

      !product.quantity

    ) {


      alert("Please fill all required fields");

      return;

    }




    try {


      const response = await fetch("/api/products", {


        method: "POST",


        headers: {


          "Content-Type": "application/json",


        },


        body: JSON.stringify({


          ProductCode: product.productCode,


          ProductName: product.productName,


          Category: product.category,


          Price: Number(product.price),


          Quantity: Number(product.quantity),


          Status: product.status,


        }),


      });





      if (response.ok) {


        const data = await response.json();



        alert("Product Added Successfully");



        router.push("/inventory/products");



      } else {


        alert("Failed to add product");


      }



    } catch(error) {


      console.log(error);


      alert("Something went wrong");


    }



  };



  return (

    <div className="space-y-6">



      {/* Header */}


      <div>


        <h1 className="text-3xl font-bold text-theme">

          Add Product

        </h1>


        <p className="text-muted mt-2">

          Create new product

        </p>


      </div>





      {/* Form */}


      <div className="card-theme border border-theme rounded-xl shadow p-6">


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



            {/* Product Information */}


            <div className="bg-theme border border-theme rounded-xl p-6">


              <h2 className="text-2xl font-bold text-theme mb-6">

                Product Information

              </h2>




              <div className="space-y-4">



                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Product Code

                  </label>


                  <input

                    type="text"

                    name="productCode"

                    value={product.productCode}

                    onChange={handleChange}

                    placeholder="PRD001"

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


                </div>





                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Product Name

                  </label>


                  <input

                    type="text"

                    name="productName"

                    value={product.productName}

                    onChange={handleChange}

                    placeholder="Enter Product Name"

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


                </div>
                                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Category

                  </label>


                  <select

                    name="category"

                    value={product.category}

                    onChange={handleChange}

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

                    <option value="">
                      Select Category
                    </option>


                    {
                      categories.map((category)=>(

                        <option

                          key={category.CategoryId}

                          value={category.CategoryName}

                        >

                          {category.CategoryName}

                        </option>

                      ))
                    }


                  </select>


                </div>



              </div>


            </div>








            {/* Inventory Information */}


            <div className="bg-theme border border-theme rounded-xl p-6">


              <h2 className="text-2xl font-bold text-theme mb-6">

                Inventory Information

              </h2>



              <div className="space-y-4">



                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Price

                  </label>


                  <input

                    type="number"

                    name="price"

                    value={product.price}

                    onChange={handleChange}

                    placeholder="50000"

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


                </div>





                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Quantity

                  </label>


                  <input

                    type="number"

                    name="quantity"

                    value={product.quantity}

                    onChange={handleChange}

                    placeholder="100"

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


                </div>





                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">

                    Status

                  </label>



                  <select

                    name="status"

                    value={product.status}

                    onChange={handleChange}

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



            </div>



          </div>







          {/* Buttons */}


          <div className="flex gap-3 pt-4">



            <button

              type="submit"

              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-lg
              "

            >

              Save Product

            </button>







            <button

              type="button"

              onClick={() => router.back()}

              className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-6
              py-2
              rounded-lg
              "

            >

              Cancel

            </button>



          </div>



        </form>


      </div>


    </div>


  );


}