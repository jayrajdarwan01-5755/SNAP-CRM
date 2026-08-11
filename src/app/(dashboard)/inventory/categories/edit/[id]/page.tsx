"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  CategoryId: number;
  CategoryName: string;
  Description: string;
};

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetch("/api/categories");

        const data: Category[] = await response.json();

        const foundCategory = data.find(
          (item) => item.CategoryId === id
        );

        if (foundCategory) {
          setCategoryName(foundCategory.CategoryName);
          setDescription(foundCategory.Description);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCategory();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          CategoryId: id,
          CategoryName: categoryName,
          Description: description,
        }),
      });

      if (response.ok) {
        alert("Category Updated Successfully");

        router.push("/inventory/categories");
      } else {
        alert("Failed to update category");
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
            Edit Category
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
            Update category information
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
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
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
              onClick={handleUpdate}
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
              Update Category
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}