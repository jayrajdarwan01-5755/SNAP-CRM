"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!categoryName || !description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          CategoryName: categoryName,
          Description: description,
        }),
      });

      if (response.ok) {
        alert("Category Added Successfully");

        router.push("/inventory/categories");
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
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
            Add Category
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
            Create new product category
          </p>

        </div>

        {/* Back Button */}

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
            transition
            w-full
            sm:w-auto
            whitespace-nowrap
          "
        >
          Back
        </button>

      </div>


      {/* Form */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-4
          sm:p-6
        "
      >

        <div className="space-y-5">

          {/* Category Name */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Category Name
            </label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="Enter Category Name"
              className="
                input-theme
                w-full
              "
            />

          </div>


          {/* Description */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter Description"
              rows={5}
              className="
                input-theme
                w-full
                resize-none
              "
            />

          </div>


          {/* Buttons */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-3
            "
          >

            <button
              type="button"
              onClick={() => router.back()}
              className="
                bg-gray-600
                hover:bg-gray-700
                text-white
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

            <button
              type="button"
              onClick={handleSave}
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
              Save Category
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}