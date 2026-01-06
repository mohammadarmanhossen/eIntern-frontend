"use client";

import { useMemo, useState } from "react";

type Internship = {
  id: number;
  title: string;
  duration: string;
  startDate: string;
  description: string;
  image: string;
};


const allInternships: Internship[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Internship ${i + 1}`,
  duration: `${2 + (i % 3)} Months`,
  startDate: `0${(i % 12) + 1} March 2026`,
  description: `Description for Internship ${i + 1}. Learn valuable skills.`,
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
}));

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 6;


  const filteredInternships = useMemo(() => {
    return allInternships.filter((intern) => {
      const matchSearch = intern.title.toLowerCase().includes(search.toLowerCase());
      const matchDuration = duration === "all" || intern.duration === duration;
      return matchSearch && matchDuration;
    });
  }, [search, duration]);

  const totalPages = Math.ceil(filteredInternships.length / PER_PAGE);
  const start = (currentPage - 1) * PER_PAGE;
  const paginated = filteredInternships.slice(start, start + PER_PAGE);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-black">
 
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Running Internships</h1>
        <p className="mt-2 text-sm text-gray-600">All currently active internship programs</p>
      </div>


      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search internship..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

     
        <select
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-md border px-4 py-2 text-sm sm:w-48"
        >
          <option value="all">All Durations</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="4 Months">4 Months</option>
        </select>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((intern) => (
          <div
            key={intern.id}
            className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={intern.image}
              alt={intern.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{intern.title}</h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Running
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-600">{intern.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Duration:</strong> {intern.duration}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Start Date:</strong> {intern.startDate}
              </p>
            </div>
          </div>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-100"
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
