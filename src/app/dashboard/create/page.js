'use client';
import { useState } from "react";
import { ENDPOINTS } from "../../../../utils/config";
import axios from "axios";

export default function createPage() {
    const [dataInput, setDataInput] = useState({
        title: "",
        author: "",
        isbn: "",
        published_date: null,
        description: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataInput({
            ...dataInput,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(ENDPOINTS.BOOKS, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${localStorage.getItem("token")}`, // Ensure you have a token stored in localStorage
            //     },
            //     body: JSON.stringify(dataInput),
            // });
            const respons = await axios.post(ENDPOINTS.BOOKS, dataInput, {
                withCredentials: true, // Ensure cookies are sent with the request
                withXSRFToken: true, // Include XSRF token if needed
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`, // Ensure you have a token stored in localStorage
                },
            });
            const response = respons;
            console.log(response);
            // if (response.status !== 201 || response.status !== 200) {
            //     throw new Error("Failed to create book");
            // }
            const result = await response.json();
            window.log("Book created successfully:", result);
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error("Error creating book:", error);
        }
    }
    return(
        <div className="py-5">
            <div className=" mb-15">
                <h2 className="text-xl font-semibold mb-4">Create a New Book</h2>
                <p className="text-gray-600">Fill in the details below to create a new book entry.</p>
            </div>
            <form className="grid gap-4 grid-flow-row" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter book title"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Isbn</label>
                    <input
                        type="text"
                        name="isbn"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                    <input
                        type="date"
                        name="published_date"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div className="flex justify-center">
                    <input type="submit" className="px-10 py-2 bg-blue-700 text-white rounded-lg font-medium " value={"Create"} />
                </div>
            </form>
        </div>
    )
}