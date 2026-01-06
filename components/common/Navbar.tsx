import Link from "next/link";
import Image from "next/image";

import {
  ChevronDownIcon,
  PlayIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-md  transition duration-200"
        >

          <div className="relative w-32 h-16 sm:w-40 sm:h-20">
            <Image
              src="/images/image.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">

          <Link href="/" className="text-sm font-bold text-gray-600 hover:text-gray-900">
            Home
          </Link>

          <div className="relative group">
            <span className="flex cursor-pointer items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-900">
              Internship
              <ChevronDownIcon className="h-4 w-4" />
            </span>

            <div className="absolute left-0 top-full z-50 hidden w-56 rounded-md border bg-white shadow-md group-hover:block">

              <Link
                href="/upcoming-internship"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                <ClockIcon className="h-4 w-4 text-yellow-600" />
                Upcoming Internship
              </Link>

              <Link
                href="/runing-internship"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                <PlayIcon className="h-4 w-4 text-blue-600" />
                Running Internship
              </Link>

              <Link
                href="/complete-internship"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                Complete Internship
              </Link>

            </div>
          </div>

          <Link href="/talent" className="text-sm font-bold text-gray-600 hover:text-gray-900">
            Talent
          </Link>

        </nav>

           <Link
          href="https://auth.dapplesoft.com"
          className="inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
        >
          Login
        </Link>

        <Link
          href="/profile"
          className="inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
        >
          Profile
        </Link>

      </div>
    </header>
  );
}
