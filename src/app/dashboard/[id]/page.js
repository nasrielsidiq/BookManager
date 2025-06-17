'use client'
import { useParams, useRouter } from "next/navigation"

import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../../../utils/config";
import axios from "axios";

export default function detailPage() {
    const params = useParams()
    const id = params.id
    const [data, setData] = useState(null);
    const [dataInput, setDataInput] = useState({
        title: "",
        author: "",
        isbn: "",
        published_date: null,
        description: ""
    });
    const [onUpdate, setOnUpdate] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(dataInput);
            
            const response = await axios.put(ENDPOINTS.BOOKS + id, dataInput, {
                withCredentials: true, // Ensure cookies are sent with the request
                withXSRFToken: true, // Include XSRF token if needed
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you have a token stored in localStorage
                }
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const result = await response.data;
            window.alert("Book updated successfully");
            setData(result)
            setOnUpdate(false);
        }
        catch (error) {
            console.error('There has been a problem with your update operation:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataInput({
            ...dataInput,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respons = await axios.get(ENDPOINTS.BOOKS + id, {
                    withCredentials: true, // Ensure cookies are sent with the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you have a token stored in localStorage
                    }
                });
                if (respons.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const result = await respons.data;
                setData(result);
                setDataInput({
                    title: result.title || "",
                    author: result.author || "",
                    isbn: result.isbn || "",
                    published_date: result.published_date || "",
                    description: result.description || ""
                });
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        fetchData();
    }, [])

    console.log(data);

    const handleDelete = async () => {
        try {
            const response = await fetch(ENDPOINTS.BOOKS + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            } else {
                window.log("Book deleted successfully");
            }
            router.push('/dashboard');
        } catch (error) {
            console.error('There has been a problem with your delete operation:', error);
        }
    }

    return (
        <div className="py-5">

            {onUpdate ? (
                <>
                    <div className="py-5">
                        <div className=" mb-15">
                            <h2 className="text-xl font-semibold mb-4">Update</h2>
                            <p className="text-gray-600">Fill in the details below to Update the book.</p>
                        </div>
                        <form className="grid gap-4 grid-flow-row" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={dataInput.title || data?.title || ""}
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
                                    value={dataInput.author || data?.author || ""}
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
                                    value={dataInput.isbn || data?.isbn || ""}
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
                                    value={dataInput.published_date || data?.published_date || ""}
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
                                    value={dataInput.description || data?.description || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter author's name"
                                />
                            </div>
                            <div className="flex justify-center">
                                <input type="submit" className="px-10 py-2 bg-blue-700 text-white rounded-lg font-medium " value={"Update"} />
                                <button
                                    type="button"
                                    onClick={e => setOnUpdate(false)}
                                    className="px-4 py-2 bg-red-700 text-white rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className=" mb-15">
                        <h2 className="text-xl font-semibold mb-4">Book Details</h2>
                        <p className="text-gray-600">View and manage the details of the selected book.</p>
                    </div>
                    <div className="font-bold text-3xl mb-5 text-gray-500">{data?.title}</div>
                    <div className="grid gap-3 grid-cols-1">
                        <div className="col bg-white text-left shadow-md rounded-lg p-5">
                            <div className="font-semibold text-gray-900 text-2xl pb-1">{data?.author}</div>
                            <div className="font-medium pb-3">ISBN: {data?.isbn}</div>
                            <div className="text-xs text-gray-700">Published on: {data?.published_date}</div>
                            <div className="text-gray-600 mt-2">
                                <p className="mb-2">Description: {data?.description}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => setOnUpdate(true)}
                                    className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={e => {
                                        if (window.confirm("Are you sure you want to delete this book?")) handleDelete();
                                    }}
                                    className="px-4 py-2 bg-red-700 text-white rounded-lg font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}