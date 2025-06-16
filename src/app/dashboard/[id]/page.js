export default function detailPage() {
    return (
        <div className="py-5">
            <div className=" mb-15">
                <h2 className="text-xl font-semibold mb-4">Book Details</h2>
                <p className="text-gray-600">View and manage the details of the selected book.</p>
            </div>
            <div className="font-bold text-3xl mb-5 text-gray-500">Book Title</div>
            <div className="grid gap-3 grid-cols-1">
                <div className="col bg-white text-left shadow-md rounded-lg p-5">
                    <div className="font-semibold text-gray-900 text-2xl pb-1">Author Name</div>
                    <div className="font-medium pb-3">ISBN: 1234567890</div>
                    <div className="text-xs text-gray-700">Published on: 2023-01-01</div>
                    <div className="text-gray-600 mt-2">
                        <p className="mb-2">Description: This is a detailed description of the book. It provides insights into the content, themes, and significance of the book.</p>
                        </div>
                    <div className="mt-4">
                        <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium mr-2">Edit</button>
                        <button className="px-4 py-2 bg-red-700 text-white rounded-lg font-medium">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}