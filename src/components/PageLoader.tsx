"use client";

export default function PageLoader() {
  return (
    <div className="animate-pulse space-y-6 p-6">

      <div className="h-10 w-56 bg-gray-300 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-xl bg-gray-300"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 rounded-xl bg-gray-300"></div>
        <div className="h-80 rounded-xl bg-gray-300"></div>
      </div>

    </div>
  );
}