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
    <div className="space-y-6 bg-theme text-theme">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Category Details
          </h1>

          <p className="text-muted mt-2">
            View category information
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

      {/* Category Information */}

      <div className="card-theme border-theme border rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold text-theme mb-6">
          Category Information
        </h2>

        <div className="grid grid-cols-1 gap-6">

          {/* Category Name */}

          <div>

            <p className="text-sm text-muted">
              Category Name
            </p>

            <p className="font-semibold text-theme">
              {category.CategoryName}
            </p>

          </div>

          {/* Description */}

          <div>

            <p className="text-sm text-muted">
              Description
            </p>

            <p className="font-semibold text-theme whitespace-pre-line">
              {category.Description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}