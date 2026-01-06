"use client";

import { useEffect, useState } from "react";

type Internship = {
  id: number;
  title: string;
  details: string;
  mode_type: string;
  working_hours: string;
  office_location: string;
  duration: string;
  start_date: string;
  end_date: string;
  certificate: boolean;
  mentorship: boolean;
  image?: string | null;
  subject_type?: { id: number; name: string } | null;
  stipend_type?: { id: number; name: string } | null;
  project_type?: { id: number; name: string } | null;
  tools_type: { id: number; name: string }[];
};


export default function Home() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/internships/")
      .then(res => res.json())
      .then(data => {
        setInternships(data);
        console.log(data)
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="mb-10 text-4xl font-bold text-center text-gray-800">
        eIntern – Internship Details
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading internships...</p>
      ) : internships.length === 0 ? (
        <p className="text-center text-gray-500">No internships found</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {internships.map(item => (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-500 mt-1"><strong>Mode:</strong> {item.mode_type}</p>
              <p className="text-gray-500 mt-1"><strong>Working Hours:</strong> {item.working_hours}</p>
              <p className="text-gray-500 mt-1"><strong>Location:</strong> {item.office_location}</p>
              <p className="text-gray-500 mt-1"><strong>Duration:</strong> {item.duration}</p>
              <p className="text-gray-500 mt-1"><strong>Start:</strong> {item.start_date} | <strong>End:</strong> {item.end_date}</p>
              <p className="text-gray-500 mt-1"><strong>Certificate:</strong> {item.certificate ? "Yes" : "No"}</p>
              <p className="text-gray-500 mt-1"><strong>Mentorship:</strong> {item.mentorship ? "Yes" : "No"}</p>
              <p className="text-gray-500 mt-1"><strong>Subject:</strong> {item.subject_type?.name || "N/A"}</p>
              <p className="text-gray-500 mt-1"><strong>Stipend:</strong> {item.stipend_type?.name || "N/A"}</p>
              <p className="text-gray-500 mt-1"><strong>Project Type:</strong> {item.project_type?.name || "N/A"}</p>
              <p className="text-gray-500 mt-1"><strong>Tools:</strong> {item.tools_type.map(t => t.name).join(", ") || "N/A"}</p>
              {item.image && (
                <img
                  src={item.image.startsWith("http") ? item.image : `https://eintern-image.s3.eu-west-3.idrivee2.com/${item.image}`}
                  alt={item.title}
                  className="mt-4 rounded-lg object-cover w-full h-48"
                />
              )}

              <p className="mt-3 text-gray-600">{item.details}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

