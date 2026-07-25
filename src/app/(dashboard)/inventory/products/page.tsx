"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";


export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const response = await fetch("/api/products");

        const data: Product[] = await response.json();

        setProducts(data);

      }
      catch (error) {

        console.log(error);

      }
      finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, []);

  const handleDelete = async (ProductId: number) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/products", {

      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ProductId,
      }),

    });

    if (response.ok) {

      setProducts((prev) =>
        prev.filter(
          (product) => product.ProductId !== ProductId
        )
      );

    }

  };

  const handleClearFilter = () => {

    setSearchText("");
    setSelectedCategory("");
    setSelectedStatus("");

  };

  const filteredProducts = products.filter((product) => {

    const searchMatch =

      product.ProductName
        .toLowerCase()
        .includes(searchText.toLowerCase())

      ||

      product.ProductCode
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const categoryMatch =

      selectedCategory === ""

      ||

      product.Category === selectedCategory;

    const statusMatch =

      selectedStatus === ""

      ||

      product.Status === selectedStatus;

    return searchMatch && categoryMatch && statusMatch;

  });

  const lastProductIndex =
    currentPage * productsPerPage;

  const firstProductIndex =
    lastProductIndex - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );
      return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage product inventory
          </p>

        </div>

        <Link
          href="/inventory/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      {/* Search Section */}

      <div className="bg-white border rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Product"
            className="border border-gray-300 bg-white text-gray-900 rounded-lg px-4 py-2"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 bg-white text-gray-900 rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 bg-white text-gray-900 rounded-lg px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Search
          </button>

          <button
            onClick={handleClearFilter}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Clear
          </button>

        </div>

      </div>

      {/* Product Table */}

      <div className="bg-white border rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-gray-900">

              <th className="px-3 py-3 text-left">Product Code</th>

              <th className="px-3 py-3 text-left">Product Name</th>

              <th className="px-3 py-3 text-left">Category</th>

              <th className="px-3 py-3 text-left">Price</th>

              <th className="px-3 py-3 text-left">Quantity</th>

              <th className="px-3 py-3 text-left">Status</th>

              <th className="px-3 py-3 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {
              loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-600"
                  >
                    Loading products...
                  </td>

                </tr>

              ) :

              filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-600"
                  >
                    No products found
                  </td>

                </tr>

              ) :

              currentProducts.map((product) => (

                <tr
                  key={product.ProductId}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-3 py-4 text-gray-800">
                    {product.ProductCode}
                  </td>

                  <td className="px-3 py-4 font-medium text-gray-900">
                    {product.ProductName}
                  </td>

                  <td className="px-3 py-4 text-gray-700">
                    {product.Category}
                  </td>

                  <td className="px-3 py-4 text-gray-700">
                    ₹{product.Price.toLocaleString("en-IN")}
                  </td>

                  <td className="px-3 py-4 text-gray-700">
                    {product.Quantity}
                  </td>

                  <td className="px-3 py-4">

                    <span
                      className={
                        product.Status === "Active"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {product.Status}
                    </span>

                  </td>

                  <td className="px-3 py-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/inventory/products/${product.ProductId}`}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </Link>

                      <Link
                        href={`/inventory/products/edit/${product.ProductId}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product.ProductId)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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

      {/* Pagination */}

      <div className="flex justify-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage}
        </span>

        <button
          disabled={
            lastProductIndex >= filteredProducts.length
          }
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}