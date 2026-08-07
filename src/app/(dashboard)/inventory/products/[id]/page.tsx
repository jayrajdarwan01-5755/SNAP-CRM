"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


type Product = {

  ProductId: number;

  ProductCode: string;

  ProductName: string;

  Category: string;

  Price: number;

  Quantity: number;

  Status: string;

};



export default function ViewProductPage() {


  const router = useRouter();


  const params = useParams();


  const id = Number(params.id);



  const [product, setProduct] = useState<Product | null>(null);





  useEffect(() => {


    const loadProduct = async () => {



      const response = await fetch("/api/products");



      const data: Product[] = await response.json();




      const foundProduct = data.find(

        (item) =>

          item.ProductId === id

      );



      setProduct(foundProduct || null);



    };



    loadProduct();



  }, [id]);






  if (!product) {


    return (

      <div className="text-muted">

        Loading Product...

      </div>

    );


  }








  return (


    <div className="space-y-6">





      {/* Header */}



      <div className="flex justify-between items-center">



        <div>



          <h1 className="text-3xl font-bold text-theme">

            Product Details

          </h1>



          <p className="text-muted mt-2">

            View product information

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
      



      {/* Product Information */}


      <div className="card-theme border border-theme rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-theme mb-6">

          Product Information

        </h2>







        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





          {/* Product Code */}


          <div>


            <p className="text-sm text-muted">

              Product Code

            </p>


            <p className="font-semibold text-theme">

              {product.ProductCode}

            </p>


          </div>









          {/* Product Name */}


          <div>


            <p className="text-sm text-muted">

              Product Name

            </p>


            <p className="font-semibold text-theme">

              {product.ProductName}

            </p>


          </div>









          {/* Category */}


          <div>


            <p className="text-sm text-muted">

              Category

            </p>


            <p className="font-semibold text-theme">

              {product.Category}

            </p>


          </div>






          {/* Price */}


          <div>


            <p className="text-sm text-muted">

              Price

            </p>


            <p className="font-semibold text-theme">

              ₹{product.Price.toLocaleString("en-IN")}

            </p>


          </div>






          {/* Quantity */}


          <div>


            <p className="text-sm text-muted">

              Quantity

            </p>


            <p className="font-semibold text-theme">

              {product.Quantity}

            </p>


          </div>






          {/* Status */}


          <div>


            <p className="text-sm text-muted mb-2">

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