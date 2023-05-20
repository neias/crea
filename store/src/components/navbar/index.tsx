"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const apiHost = process.env.API_HOST;

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();

    const request = await fetch(`${apiHost}/auth/logout`, {
      credentials: "include",
    });
    if (request.status === 200) {
      router.push("/login");
    }
  };

  return (
    <nav className="bg-blue-500 p-6">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Crea Store
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/product">
              <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Products
              </span>
            </Link>
            <a href="#" onClick={handleLogout}>
              <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Logout
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
