'use client';
import Image from "next/image";
import { useState } from "react";
import { ENDPOINTS } from "../../utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Register } from "./register";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [onRegister, setOnRegister] = useState(false);

  const handleRegister = () => {
    setOnRegister(!onRegister);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // await fetch(ENDPOINTS.COOKIES,{
      //   method: "GET",
      //   credentials: "include", // Ensure cookies are sent with the request
      // });

      await axios.get(ENDPOINTS.COOKIES, {
        withCredentials: true, // Ensure cookies are sent with the request
        // withXSRFToken: true, // Include XSRF token if needed
      }).then((response) => {
        console.log("Cookies set successfully:", response);
      }).catch((error) => {
        console.error("Error setting cookies:", error);
      });
      const response = await axios.post(ENDPOINTS.LOGIN, {
        email: email,
        password: password,
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
        withXSRFToken: true, // Include XSRF token if needed
      });
      if (response.status !== 200) {
        throw new Error("Login failed " + response.status + " " + response.statusText);
      }
      const data = await response.data;
      // localStorage.setItem("token", data.token);
      // Setelah dapat token dari backend
      document.cookie = `token=${data.token}; path=/; max-age=604800`; // 7 hari
      console.log(data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <div className="flex flex-col w-screen border justify-center align-middle h-screen bg-gray-100">
      <div className="m-auto flex flex-col">
        {
          onRegister ? (
            <Register />
          ) : (
            <div className=" bg-white shadow-md rounded-lg mx-auto my-auto p-15">
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
          )
        }
        <button onClick={handleRegister} className="m-auto mt-5 font-semibold decoration-1 decoration-solid">{onRegister ? "login" : "register"}</button>
      </div>

    </div>
  );
}
