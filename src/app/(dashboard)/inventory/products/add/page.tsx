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
    } catch (error) {
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
        await response.json();

        alert("Product Added Successfully");

        router.push("/inventory/products");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-3">

        <h1 className="text-2xl sm:text-3xl font-bold text-theme">
          Add Product
        </h1>

        <p className="text-muted text-sm sm:text-base">
          Create new product
        </p>

      </div>

      {/* Form Card */}

      <div className="card-theme border border-theme rounded-xl shadow-sm p-4 sm:p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Product & Inventory Information */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

            {/* Product Information */}

            <div className="card-theme border border-theme rounded-xl p-4 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
                Product Information
              </h2>

              <div className="space-y-4">

                {/* Product Code */}

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
                      input-theme
                      w-full
                      min-w-0
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
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    className="
                      input-theme
                      w-full
                      min-w-0
                    "
                  />

                </div>

                {/* Category */}

                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="
                      input-theme
                      w-full
                      min-w-0
                    "
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map((category) => (

                      <option
                        key={category.CategoryId}
                        value={category.CategoryName}
                      >
                        {category.CategoryName}
                      </option>

                    ))}

                  </select>

                </div>

              </div>

            </div>

            {/* Inventory Information */}

            <div className="card-theme border border-theme rounded-xl p-4 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
                Inventory Information
              </h2>

              <div className="space-y-4">

                {/* Price */}

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
                      input-theme
                      w-full
                      min-w-0
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
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    className="
                      input-theme
                      w-full
                      min-w-0
                    "
                  />

                </div>

                {/* Status */}

                <div>

                  <label className="block text-sm font-semibold text-muted mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={product.status}
                    onChange={handleChange}
                    className="
                      input-theme
                      w-full
                      min-w-0
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

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              pt-2
            "
          >

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-2.5
                rounded-lg
                transition
                w-full
                sm:w-auto
              "
            >
              Save Product
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="
                button-secondary
                px-6
                py-2.5
                rounded-lg
                transition
                w-full
                sm:w-auto
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