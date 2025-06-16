'use client';
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [toggleSide, setToggleSide] = useState(false);

  const handleToggleSide = () => {
    setToggleSide(!toggleSide);
  }
  return (
    <div className="flex overflow-auto h-screen border-2">
      <button onClick={() => { handleToggleSide() }} className={`$toggleSide ? "translate-x-55" : "" transition-transform duration-500 ease-in-out w-15 bg-white px-2 py-1 transform -rotate-270 origin-bottom-left whitespace-nowrap rounded-t-lg absolute border-1 border-gray-400 md:hidden`}>Menu</button>
      <aside
        id="sidebar"
        className={`${toggleSide ? "-translate-x-10" : "-translate-x-100"} text-white min-w-[250px] max-w-[270px] transition-transform duration-500 ease-in-out z-20 md:translate-x-0 shadow-lg  h-screen font-normal flex flex-col bg-blue-700 fixed`}
      >
        <div className="pt-10 w-full flex flex-col items-center justify-center">
          <span className="font-poppins text-[20px] font-bold">Book Manager</span>
        </div>
        <div className="mt-10 w-full flex-1">
          <ul className="w-full grid gap-3 px-5 font-semibold">
              <li>
                <Link href={"/dashboard"}>Overview</Link>
              </li>
              <li>
                <Link href={"/dashboard/create"}>Create</Link>
              </li>
          </ul>
        </div>
      </aside>
      <div className="flex-grow flex flex-col md:ml-[300px]">
        <main className="flex-grow md:p-4">
          {children}
        </main>
        <footer className="bg-white shadow-lg rounded-xl overflow-hidden w-full h-16 flex justify-center items-center mt-auto">
          <span className="text-gray-500 text-sm">© 2023 Octagram Divisi 11. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
}