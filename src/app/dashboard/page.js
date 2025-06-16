import Link from "next/link";

export default function Home() {
    
    return (
        <div className="py-5">
            <div className=" mb-15">
                <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
                <p className="text-gray-600">This is your dashboard where you can manage your account, view statistics, and access various features.</p>
            </div>
            <div className="font-bold text-3xl mb-5 text-gray-500">Books</div>
            <div className="grid gap-3 grid-cols-4">
                <Link href={"/dashboard/id"} className="col bg-white text-left shadow-md rounded-lg p-5">
                    <div className="font-semibold text-gray-900 text-2xl pb-1">Title</div>
                    <div className="font-medium pb-3">Author</div>
                    <div className="text-xs text-gray-700">date</div>
                </Link>
            </div>
        </div>
    )
}