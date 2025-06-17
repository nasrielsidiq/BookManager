'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ENDPOINTS, formatDate } from "../../../utils/config";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(ENDPOINTS.BOOKS, {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Authorization": `Bearer ${localStorage.getItem("token")}`, // Ensure you have a token stored in localStorage
                //     },
                // }); // Adjust the endpoint as needed
                const response = await axios.get(ENDPOINTS.BOOKS, {
                    withCredentials: true, // Ensure cookies are sent with the request
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Ensure you have a token stored in localStorage
                    },
                });
                if (response.status !== 200) {
                    throw new Error("Failed to fetch books");
                }
                const result = await response.data;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    console.log(data);

    return (
        <div className="py-5">
            <div className=" mb-15">
                <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
                <p className="text-gray-600">This is your dashboard where you can manage your account, view statistics, and access various features.</p>
            </div>
            <div className="font-bold text-3xl mb-5 text-gray-500">Books</div>
            <div className="grid gap-3 grid-cols-4">
                {
                    data && data.map((item, key) => (
                        <Link key={key} href={`/dashboard/${item.id}`} className="col bg-white text-left shadow-md rounded-lg p-5">
                            <div className="font-semibold text-gray-900 text-2xl pb-1">{item.title}</div>
                            <div className="font-medium pb-3">{item.author}</div>
                            <div className="text-xs text-gray-700">{formatDate(item.published_date)}</div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}