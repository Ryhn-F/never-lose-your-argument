/**
 * Navigation component for site navigation
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FCIcon } from "@/assets";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

export const Navigation: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("/");
  const pathname = usePathname();

  const handleMenuClick = (path: string) => {
    setActiveMenu(path);
  };

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);
  return (
    <nav className="bg-transparent border-b border-transparent dark:bg-transparent sticky top-0 z-20 bg-black ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link href="/">
              <Image src={FCIcon} alt="logos" width={100} />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex flex-row items-center space-x-4  px-5 py-4 rounded-full bg-white/10  backdrop-blur-xl border border-slate-200/10">
              <Link
                href={"/"}
                onClick={() => handleMenuClick("/")}
                className={`
                  ${
                    activeMenu === "/" ? "text-white" : "text-gray-300"
                  } hover:text-white transition-all duration-300`}
              >
                Home
              </Link>
              <Link
                href={"/features"}
                onClick={() => handleMenuClick("/features")}
                className={`
                  ${
                    activeMenu === "/features" ? "text-white" : "text-gray-300"
                  } hover:text-white transition-all duration-300`}
              >
                Features
              </Link>
              <Link
                href={""}
                className="text-gray-300 hover:text-white transition-all duration-300"
              >
                App
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/about"
              className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white font-medium transition-colors flex flex-row space-x-2 items-center"
            >
              <IoPersonOutline />
              <p>Create Account</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
