"use client";

import { useEffect, useMemo, useState } from "react";
import { Certificate } from "@/types/certificate";
import { getCertificates } from "@/lib/api/certificate";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  useEffect(() => {
    getCertificates().then(setCertificates);
  }, []);


  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const matchSearch =
        c.studentName.toLowerCase().includes(search.toLowerCase()) ||
        c.internshipName.toLowerCase().includes(search.toLowerCase());

      const matchYear =
        year === "all" || c.completionYear.toString() === year;

      return matchSearch && matchYear;
    });
  }, [certificates, search, year]);


  const totalPages = Math.ceil(filteredCertificates.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = filteredCertificates.slice(start, start + PER_PAGE);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-black">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Internship Certificates</h1>
        <p className="mt-2 text-sm text-gray-600">
          Public certificate verification (view only)
        </p>
      </div>


      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search student or internship..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-md border px-4 py-2 text-sm sm:w-48"
        >
          <option value="all">All Years</option>
          {[...new Set(certificates.map((c) => c.completionYear))].map(
            (y) => (
              <option key={y} value={y}>
                {y}
              </option>
            )
          )}
        </select>
      </div>


      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((c) => (
          <div
            key={c.id}
            className="relative rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Verified
            </span>

            <h3 className="text-lg font-semibold">{c.studentName}</h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {c.internshipName}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Completion Year: {c.completionYear}
            </p>

            <button
              onClick={() => setSelected(c)}
              className="mt-6 w-full rounded-md border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View Certificate
            </button>
          </div>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${page === i + 1
                  ? "bg-blue-600 text-white"
                  : "border bg-white hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">


            <div className="flex items-center justify-between border-b px-8 py-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Certificate Verification
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 transition hover:text-gray-800"
              >
                ✕
              </button>
            </div>


            <div className="p-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
                Official Internship Certificate
              </p>

              <h3 className="text-3xl font-bold text-gray-900">
                Certificate of Completion
              </h3>

              <p className="mt-8 text-sm text-gray-600">
                This is to certify that
              </p>

              <p className="mt-3 text-2xl font-semibold text-blue-700">
                {selected.studentName}
              </p>

              <p className="mt-6 text-sm text-gray-600">
                has successfully completed the internship program
              </p>

              <p className="mt-2 text-lg font-medium text-gray-800">
                {selected.internshipName}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-gray-600">
                <div className="rounded-md border p-4">
                  <p className="font-medium">Completion Year</p>
                  <p className="mt-1">{selected.completionYear}</p>
                </div>

                <div className="rounded-md border p-4">
                  <p className="font-medium">Certificate ID</p>
                  <p className="mt-1">{selected.id}</p>
                </div>
              </div>


              <div className="mt-10 border-t pt-4 text-xs text-gray-400">
                This certificate is digitally verified and publicly viewable.
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
