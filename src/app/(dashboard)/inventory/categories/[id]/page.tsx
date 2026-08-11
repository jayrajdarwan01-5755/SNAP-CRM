"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  CategoryId: number;
  CategoryName: string;
  Description: string;
};

export default function ViewCategoryPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetch("/api/categories");

        const data: Category[] = await response.json();

        const foundCategory = data.find(
          (item) => item.CategoryId === id
        );

        setCategory(foundCategory || null);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategory();
  }, [id]);

  if (!category) {
    return (
      <div className="text-muted">
        Loading Category...
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
            Category Details
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
            View category information
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


      {/* Category Information */}

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

        <h2
          className="
            text-xl
            sm:text-2xl
            font-semibold
            text-theme
            mb-6
          "
        >
          Category Information
        </h2>


        <div className="space-y-6">

          {/* Category Name */}

          <div>

            <p className="text-sm text-muted mb-1">
              Category Name
            </p>

            <p className="font-semibold text-theme">
              {category.CategoryName}
            </p>

          </div>


          {/* Description */}

          <div>

            <p className="text-sm text-muted mb-1">
              Description
            </p>

            <p
              className="
                font-semibold
                text-theme
                whitespace-pre-line
                break-words
              "
            >
              {category.Description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}