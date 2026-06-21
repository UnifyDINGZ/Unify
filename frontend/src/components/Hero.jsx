import { MdSearch, MdNotifications } from "react-icons/md"

export default function Hero() {
    return (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold whitespace-nowrap">Dashboard</h1>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="search" placeholder="Search products, suppliers..." className="w-72 border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none" />
                </div>

                <button className="relative p-2 rounded-md hover:bg-gray-100 transition" aria-label="Notifications">
                    <MdNotifications size={22} className="text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                </button>
            </div>
        </div>
    )
}