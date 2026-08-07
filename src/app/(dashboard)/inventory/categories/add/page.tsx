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
  };

  return (
    <div className="space-y-6 bg-theme text-theme">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Add Category
          </h1>

          <p className="text-muted mt-2">
            Create new product category
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
          transition
          "
        >
          Back
        </button>

      </div>

      {/* Form */}

      <div className="card-theme border-theme border rounded-xl shadow p-6">

        <div className="grid grid-cols-1 gap-6">

          {/* Category Name */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Category Name
            </label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category Name"
              className="
              w-full
              bg-theme
              text-theme
              text-theme
              border-theme
              border
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Description */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              rows={4}
              className="
              w-full
              bg-theme
              text-theme
              text-theme
              border-theme
              border
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

        </div>

        {/* Save Button */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleSave}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            transition
            "
          >
            Save Category
          </button>

        </div>

      </div>

    </div>
  );
}