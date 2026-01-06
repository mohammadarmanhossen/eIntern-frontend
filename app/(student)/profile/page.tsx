


// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function ProfilePage() {
//     const [activeTab, setActiveTab] = useState("personal");

//     const tabs = [
//         { id: "personal", label: "Personal Information" },
//         { id: "address", label: "Address" },
//         { id: "education", label: "Education" },
//         { id: "jobProfile", label: "Job Profile" },
//         { id: "experience", label: "Job Experience" },
//         { id: "skills", label: "Skill Set" },
//         { id: "links", label: "Important Links" },
//         { id: "application", label: "Job Application" },
//         { id: "oj", label: "Online Judge Handles" },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4">
//             <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8">


//                 <aside className="w-full lg:w-72 bg-white rounded shadow-lg p-6 sticky top-8">
//                     <h2 className="text-xl font-bold mb-6 text-gray-800">My Profile</h2>
//                     <nav className="flex flex-col gap-2">
//                         {tabs.map((tab) => (
//                             <button
//                                 key={tab.id}
//                                 onClick={() => setActiveTab(tab.id)}
//                                 className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 transform ${activeTab === tab.id
//                                         ? "bg-blue-500 from-black  text-white shadow-lg scale-105"
//                                         : "text-gray-600 hover:bg-blue-500 hover:text-white hover:scale-105"
//                                     }`}
//                             >
//                                 {tab.label}
//                             </button>
//                         ))}
//                     </nav>
//                 </aside>

    
//                 <main className="flex-1 bg-white rounded shadow-lg border border-gray-100 p-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                         {tabs.find(tab => tab.id === activeTab)?.label}
//                     </h2>


//                     <div className="flex flex-col items-center mb-8">
//                         <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 ring-2 ring-purple-200 transition-transform duration-500 hover:scale-110 hover:rotate-3 shadow-xl">
//                             <Image
//                                 src="/images/man.webp"
//                                 alt="Profile Picture"
//                                 fill
//                                 className="object-cover transition-transform duration-500"
//                             />
//                         </div>
//                     </div>

         
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="p-4 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <label className="block text-xs font-bold uppercase text-gray-500">Student ID</label>
//                             <input
//                                 type="text"
//                                 value="N/A"
//                                 readOnly
//                                 className="mt-1 w-full rounded-xl border-none bg-gray-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 transition-all"
//                             />
//                         </div>

//                         <div className="p-4 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <label className="block text-xs font-bold uppercase text-gray-500">Full Name</label>
//                             <input
//                                 type="text"
//                                 value="Mohammad Arman"
//                                 readOnly
//                                 className="mt-1 w-full rounded-xl border-none bg-gray-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 transition-all"
//                             />
//                         </div>

//                         <div className="md:col-span-2 p-4 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <label className="block text-xs font-bold uppercase text-gray-500">Email Address</label>
//                             <input
//                                 type="email"
//                                 value="mdarmanhossen404@gmail.com"
//                                 readOnly
//                                 className="mt-1 w-full rounded-xl border-none bg-gray-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 transition-all"
//                             />
                         
//                         </div>
//                            <a href="#" className="text-blue-500 text-sm mt-1 inline-block hover:underline">Change Password</a>
//                     </div>


//                     <div className="mt-8 text-center">
//                         <button className="bg-blue-500 from-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 active:scale-95">
//                             Edit Profile
//                         </button>
//                     </div>

       
//                     {activeTab !== "personal" && (
//                         <div className="py-20 text-center text-gray-400">
//                             <p>Content for <span className="font-semibold text-gray-600">{tabs.find(t => t.id === activeTab)?.label}</span> coming soon...</p>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userInfo = localStorage.getItem("user");

    if (!token) {
      // যদি token না থাকে → login page এ redirect
      router.push("/login");
      return;
    }

    if (userInfo) {
      // localStorage থেকে user info set করা
      setUser(JSON.parse(userInfo));
    } else {
      // Optionally central auth server থেকে fetch করা যেতে পারে
      fetch("https://auth.dapplesoft.com/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => console.error(err));
    }
  }, [router]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
        <p>
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}
