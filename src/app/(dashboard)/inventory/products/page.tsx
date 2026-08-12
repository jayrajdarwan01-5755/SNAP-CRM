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
      } catch (error) {
        console.log(error);
      } finally {
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
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      product.ProductName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      product.ProductCode
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const categoryMatch =
      selectedCategory === "" ||
      product.Category === selectedCategory;

    const statusMatch =
      selectedStatus === "" ||
      product.Status === selectedStatus;

    return searchMatch && categoryMatch && statusMatch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / productsPerPage
    )
  );

  const lastProductIndex =
    currentPage * productsPerPage;

  const firstProductIndex =
    lastProductIndex - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

  const showingFrom =
    filteredProducts.length === 0
      ? 0
      : firstProductIndex + 1;

  const showingTo = Math.min(
    lastProductIndex,
    filteredProducts.length
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-theme">
            Product Management
          </h1>

          <p className="text-muted mt-2">
            Manage product inventory
          </p>
        </div>

        <Link
          href="/inventory/products/add"
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          text-center
          "
        >
          + Add Product
        </Link>

      </div>


      {/* ================= SEARCH & FILTER ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
        "
      >

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          "
        >

          {/* Search */}

          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Product"
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


          {/* Category */}

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
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
              All Categories
            </option>

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


          {/* Status */}

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
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
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>


          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="button"
              className="
              flex-1
              bg-green-600
              hover:bg-green-700
              text-white
              rounded-lg
              px-4
              py-2
              "
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleClearFilter}
              className="
              flex-1
              bg-gray-600
              hover:bg-gray-700
              text-white
              rounded-lg
              px-4
              py-2
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>


      {/* ================= DATA CARD ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        overflow-hidden
        "
      >

        {/* ================= DESKTOP / TABLET ================= */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-theme">

              <tr className="text-theme">

                <th className="px-4 py-4 text-left">
                  Product Code
                </th>

                <th className="px-4 py-4 text-left">
                  Product Name
                </th>

                <th className="px-4 py-4 text-left">
                  Category
                </th>

                <th className="px-4 py-4 text-left">
                  Price
                </th>

                <th className="px-4 py-4 text-left">
                  Quantity
                </th>

                <th className="px-4 py-4 text-left">
                  Status
                </th>

                <th className="px-4 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    Loading products...
                  </td>

                </tr>

              ) : filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No products found
                  </td>

                </tr>

              ) : (

                currentProducts.map((product) => (

                  <tr
                    key={product.ProductId}
                    className="
                    border-t
                    border-theme
                    hover:bg-theme
                    table-row-theme
                    "
                  >

                    <td className="px-4 py-4 text-theme">
                      {product.ProductCode}
                    </td>

                    <td className="px-4 py-4 font-medium text-theme">
                      {product.ProductName}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      {product.Category}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      ₹
                      {product.Price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      {product.Quantity}
                    </td>

                    <td className="px-4 py-4">

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

                    <td className="px-4 py-4">

                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/inventory/products/${product.ProductId}`}
                          className="
                          bg-green-600
                          hover:bg-green-700
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
                          href={`/inventory/products/edit/${product.ProductId}`}
                          className="
                          bg-blue-600
                          hover:bg-blue-700
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
                          type="button"
                          onClick={() =>
                            handleDelete(product.ProductId)
                          }
                          className="
                          bg-red-600
                          hover:bg-red-700
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

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden">

          {loading ? (

            <div className="text-center py-10 text-muted">
              Loading products...
            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="text-center py-10 text-muted">
              No products found
            </div>

          ) : (

            <div className="divide-y divide-gray-200 dark:divide-gray-700">

              {currentProducts.map((product) => (

                <div
                  key={product.ProductId}
                  className="
                  p-5
                  table-row-theme
                  "
                >

                  <div className="flex justify-between items-start gap-3 mb-4">

                    <div>

                      <h3 className="font-semibold text-lg text-theme">
                        {product.ProductName}
                      </h3>

                      <p className="text-sm text-muted mt-1">
                        {product.ProductCode}
                      </p>

                    </div>

                    <span
                      className={
                        product.Status === "Active"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                      }
                    >
                      {product.Status}
                    </span>

                  </div>


                  <div className="space-y-3">

                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-muted">
                        Category
                      </span>

                      <span className="text-sm font-medium text-theme text-right">
                        {product.Category}
                      </span>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-muted">
                        Price
                      </span>

                      <span className="text-sm font-medium text-theme text-right">
                        ₹
                        {product.Price.toLocaleString("en-IN")}
                      </span>

                    </div>


                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-muted">
                        Quantity
                      </span>

                      <span className="text-sm font-medium text-theme text-right">
                        {product.Quantity}
                      </span>

                    </div>

                  </div>


                  {/* Mobile Actions */}

                  <div className="flex gap-2 mt-5">

                    <Link
                      href={`/inventory/products/${product.ProductId}`}
                      className="
                      flex-1
                      text-center
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/inventory/products/edit/${product.ProductId}`}
                      className="
                      flex-1
                      text-center
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product.ProductId)
                      }
                      className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* ================= PAGINATION CARD ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        "
      >

        <div
          className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-4
          "
        >

          {/* Showing */}

          <p className="text-sm text-muted">

            Showing{" "}
            <span className="font-semibold text-theme">
              {showingFrom}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-theme">
              {showingTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-theme">
              {filteredProducts.length}
            </span>{" "}
            products

          </p>


          {/* Pagination */}

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="
              px-3
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Previous
            </button>


            <span className="px-3 py-2 text-sm text-theme whitespace-nowrap">

              Page {currentPage} of {totalPages}

            </span>


            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="
              px-3
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}