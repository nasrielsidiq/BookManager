'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENDPOINTS } from "../../utils/config";

export const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(ENDPOINTS.REGISTER, data, {
                withCredentials: true, // Ensure cookies are sent with the request
                withXSRFToken: true, // Include XSRF token if needed
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status !== 201 || response.status !== 200) {
                console.log('Registration failed');
            }
            const result = await response.data;
            // localStorage.setItem('token', result.token);
            document.cookie = `token=${result.token}; path=/; max-age=604800`; // 7 hari
            router.push('/dashboard'); // Redirect to login page after successful registration
            // console.log('Registration successful:', result);
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg my-auto p-15">
            <div className="text-2xl font-medium font-arial text-center">Register</div>
            <form className="grid gap-4 grid-flow-row" onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
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
                        name="password"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your password"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password Confirmation
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your password confirmation"
                    />
                </div>
                <div className="flex justify-center">
                    <input type="submit" className="px-10 py-2 bg-blue-700 text-white rounded-lg font-medium " value={"Login"} />
                </div>
            </form>
        </div>
    )
}