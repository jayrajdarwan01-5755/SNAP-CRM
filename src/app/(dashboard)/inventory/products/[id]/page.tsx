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
        (item) => item.ProductId === id
      );

      setProduct(foundProduct || null);
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="w-full min-w-0 space-y-5 sm:space-y-6">
        <div className="card-theme border border-theme rounded-xl shadow-sm p-6">
          <p className="text-muted text-center">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-theme
            "
          >
            Product Details
          </h1>

          <p
            className="
              text-muted
              mt-1
              sm:mt-2
              text-sm
              sm:text-base
            "
          >
            View product information
          </p>

        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2.5
            rounded-lg
            w-full
            sm:w-auto
            whitespace-nowrap
          "
        >
          Back
        </button>

      </div>


      {/* Product Information */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-5
          sm:p-6
        "
      >

        <h2
          className="
            text-xl
            sm:text-2xl
            font-semibold
            text-theme
            mb-6
          "
        >
          Product Information
        </h2>


        {/* Product Details */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-x-10
            gap-y-6
          "
        >

          {/* Product Code */}

          <div>
            <p className="text-sm text-muted mb-1">
              Product Code
            </p>

            <p className="font-semibold text-theme break-words">
              {product.ProductCode}
            </p>
          </div>


          {/* Product Name */}

          <div>
            <p className="text-sm text-muted mb-1">
              Product Name
            </p>

            <p className="font-semibold text-theme break-words">
              {product.ProductName}
            </p>
          </div>


          {/* Category */}

          <div>
            <p className="text-sm text-muted mb-1">
              Category
            </p>

            <p className="font-semibold text-theme break-words">
              {product.Category}
            </p>
          </div>


          {/* Price */}

          <div>
            <p className="text-sm text-muted mb-1">
              Price
            </p>

            <p className="font-semibold text-theme">
              ₹{product.Price.toLocaleString("en-IN")}
            </p>
          </div>


          {/* Quantity */}

          <div>
            <p className="text-sm text-muted mb-1">
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
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
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