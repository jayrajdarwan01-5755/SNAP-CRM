"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  CategoryId: number;
  CategoryName: string;
  Description: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const categoriesPerPage = 5;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/categories");

      const data: Category[] = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (CategoryId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/categories", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        CategoryId,
      }),
    });

    if (response.ok) {
      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.CategoryId !== CategoryId
        )
      );
    }
  };

  const handleClear = () => {
    setSearchText("");
    setCurrentPage(1);
  };

  const filteredCategories = categories.filter(
    (category) => {
      return (
        category.CategoryName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        category.Description
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCategories.length /
        categoriesPerPage
    )
  );

  const lastIndex =
    currentPage * categoriesPerPage;

  const firstIndex =
    lastIndex - categoriesPerPage;

  const currentCategories =
    filteredCategories.slice(
      firstIndex,
      lastIndex
    );

  const showingFrom =
    filteredCategories.length === 0
      ? 0
      : firstIndex + 1;

  const showingTo = Math.min(
    lastIndex,
    filteredCategories.length
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
        "
      >

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Category Management
          </h1>

          <p className="text-muted mt-2">
            Manage product categories
          </p>

        </div>

        <Link
          href="/inventory/categories/add"
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          text-center
          transition
          "
        >
          + Add Category
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
          lg:grid-cols-3
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
            placeholder="Search Category"
            className="
            w-full
            bg-theme
            text-theme
            placeholder:text-muted
            border
            border-theme
            rounded-lg
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />


          {/* Search Button */}

          <button
            type="button"
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            px-4
            py-2
            transition
            "
          >
            Search
          </button>


          {/* Clear Button */}

          <button
            type="button"
            onClick={handleClear}
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            px-4
            py-2
            transition
            "
          >
            Clear
          </button>

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
                  Category Name
                </th>

                <th className="px-4 py-4 text-left">
                  Description
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
                    colSpan={3}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    Loading categories...
                  </td>

                </tr>

              ) : filteredCategories.length === 0 ? (

                <tr>

                  <td
                    colSpan={3}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No categories found
                  </td>

                </tr>

              ) : (

                currentCategories.map(
                  (category) => (

                    <tr
                      key={category.CategoryId}
                      className="
                      border-t
                      border-theme
                      hover:bg-theme
                      table-row-theme
                      transition
                      "
                    >

                      {/* Category Name */}

                      <td
                        className="
                        px-4
                        py-4
                        font-medium
                        text-theme
                        "
                      >
                        {category.CategoryName}
                      </td>


                      {/* Description */}

                      <td
                        className="
                        px-4
                        py-4
                        text-muted
                        "
                      >
                        {category.Description}
                      </td>


                      {/* Actions */}

                      <td className="px-4 py-4">

                        <div
                          className="
                          flex
                          justify-center
                          gap-2
                          "
                        >

                          <Link
                            href={`/inventory/categories/${category.CategoryId}`}
                            className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3
                            py-1
                            rounded
                            text-sm
                            transition
                            "
                          >
                            View
                          </Link>

                          <Link
                            href={`/inventory/categories/edit/${category.CategoryId}`}
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-3
                            py-1
                            rounded
                            text-sm
                            transition
                            "
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                category.CategoryId
                              )
                            }
                            className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1
                            rounded
                            text-sm
                            transition
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden">

          {loading ? (

            <div
              className="
              text-center
              py-10
              text-muted
              "
            >
              Loading categories...
            </div>

          ) : filteredCategories.length === 0 ? (

            <div
              className="
              text-center
              py-10
              text-muted
              "
            >
              No categories found
            </div>

          ) : (

            <div>

              {currentCategories.map(
                (category) => (

                  <div
                    key={category.CategoryId}
                    className="
                    p-5
                    border-b
                    border-theme
                    table-row-theme
                    "
                  >

                    {/* Category */}

                    <div className="mb-4">

                      <h3
                        className="
                        text-lg
                        font-semibold
                        text-theme
                        "
                      >
                        {category.CategoryName}
                      </h3>

                    </div>


                    {/* Description */}

                    <div className="space-y-3">

                      <div>

                        <p className="text-sm text-muted">
                          Description
                        </p>

                        <p
                          className="
                          text-sm
                          font-medium
                          text-theme
                          mt-1
                          "
                        >
                          {category.Description}
                        </p>

                      </div>

                    </div>


                    {/* Mobile Actions */}

                    <div
                      className="
                      flex
                      gap-2
                      mt-5
                      "
                    >

                      <Link
                        href={`/inventory/categories/${category.CategoryId}`}
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
                        transition
                        "
                      >
                        View
                      </Link>

                      <Link
                        href={`/inventory/categories/edit/${category.CategoryId}`}
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
                        transition
                        "
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            category.CategoryId
                          )
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
                        transition
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

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
            </span>

            {" "}to{" "}

            <span className="font-semibold text-theme">
              {showingTo}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-theme">
              {filteredCategories.length}
            </span>

            {" "}categories

          </p>


          {/* Pagination */}

          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
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


            <span
              className="
              px-3
              py-2
              text-sm
              text-theme
              whitespace-nowrap
              "
            >
              Page {currentPage} of {totalPages}
            </span>


            <button
              type="button"
              disabled={
                currentPage >= totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
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