'use client';
import Image from "next/image";
import { useState } from "react";
import { ENDPOINTS } from "../../utils/config";

export default function Home() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(ENDPOINTS.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            if (!response.ok) {
                throw new Error("Login failed "+ response.statusText);
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(data.token);
            
        }catch (error) {
            console.error("Login failed:", error);
        }
    }
  return (
    <div className="flex justify-center align-middle h-screen bg-gray-100">
      <div className="w-2/8 bg-white shadow-md rounded-lg my-auto p-15">
        <div className="text-2xl font-medium font-arial text-center">Login</div>
        <form className="grid gap-4 grid-flow-row" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-center">
            <input type="submit" className="px-10 py-2 bg-blue-700 text-white rounded-lg font-medium " value={"Login"} />
          </div>
        </form>
      </div>
    </div>
  );
}
