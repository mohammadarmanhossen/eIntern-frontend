
"use client";

import { useEffect, useMemo, useState } from "react";

type Internship = {
  id: number;
  title: string;
  duration: string;
  completedAt: string;
  description: string;
  image: string;
};


const allCompletedInternships: Internship[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: i + 1,
    title: `Completed Internship ${i + 1}`,
    duration: `${2 + (i % 3)} Months`,
    completedAt: `0${(i % 12) + 1} April 2026`,
    description: "This internship program has been successfully completed.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  })
);

export default function CompleteInternshipsPage() {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;


  const filteredInternships = useMemo(() => {
    return allCompletedInternships.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchDuration =
        duration === "all" || item.duration === duration;

      return matchSearch && matchDuration;
    });
  }, [search, duration]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, duration]);


  const totalPages = Math.ceil(filteredInternships.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedInternships = filteredInternships.slice(
    start,
    start + perPage
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-black">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">
          Completed Internships
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Verified internship completion certificates
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="w-full sm:w-80">



          <div className="flex w-full max-w-md items-center gap-2">
    
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by internship name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>
            </div>

          </div>

        </div>
        <div className="w-full sm:w-52">

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Durations</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="4 Months">4 Months</option>
          </select>
        </div>
      </div>



      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedInternships.map((intern) => (
          <div
            key={intern.id}
            className="relative overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Completed
            </span>

            <img
              src={intern.image}
              alt={intern.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-lg font-semibold">
                {intern.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {intern.description}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>
                  <strong>Duration:</strong> {intern.duration}
                </p>
                <p>
                  <strong>Completed:</strong> {intern.completedAt}
                </p>
              </div>
            </div>
          </div>
        ))}

        {paginatedInternships.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No internships found
          </p>
        )}
      </div>


      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border bg-white hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
