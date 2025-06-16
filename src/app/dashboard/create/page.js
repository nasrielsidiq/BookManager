export default function createPage() {
    return(
        <div className="py-5">
            <div className=" mb-15">
                <h2 className="text-xl font-semibold mb-4">Create a New Book</h2>
                <p className="text-gray-600">Fill in the details below to create a new book entry.</p>
            </div>
            <form className="grid gap-4 grid-flow-row">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter book title"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Isbn</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                    <input
                        type="date"
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