import { useState, useRef, useEffect } from "react";
import { MdSearch, MdNotifications } from "react-icons/md";

const notifications = [
    {
        id: 1,
        name: "Drake Delos Reyes",
        avatar: "D",
        avatarBg: "bg-purple-100",
        avatarColor: "text-purple-600",
        message: "Submitted a new purchase order for review.",
        time: "2m ago",
        unread: true,
    },
    {
        id: 2,
        name: "Gabriel",
        avatar: "G",
        avatarBg: "bg-blue-100",
        avatarColor: "text-blue-600",
        message: "Flagged supplier #0042 for urgent attention.",
        time: "15m ago",
        unread: true,
    },
    {
        id: 3,
        name: "Nimrod",
        avatar: "N",
        avatarBg: "bg-green-100",
        avatarColor: "text-green-600",
        message: "Approved the Q3 budget allocation.",
        time: "1h ago",
        unread: true,
    },
    {
        id: 4,
        name: "Ivan",
        avatar: "I",
        avatarBg: "bg-gray-100",
        avatarColor: "text-gray-500",
        message: "Your monthly savings report is ready to view.",
        time: "3h ago",
        unread: false,
    },
];

export default function Hero() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifs, setNotifs] = useState(notifications);
    const panelRef = useRef(null);

    const unreadCount = notifs.filter((n) => n.unread).length;

    useEffect(() => {
        function handleClickOutside(e) {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

    return (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl text-gray-900 font-bold whitespace-nowrap">Dashboard</h1>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="search" placeholder="Search products, suppliers..." className="w-72 border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none" />
                </div>

                <div className="relative" ref={panelRef}>
                    <button onClick={() => setShowNotifications((v) => !v)} className="relative p-2 rounded-md hover:bg-gray-100 transition" aria-label="Notifications">
                        <MdNotifications size={22} className="text-gray-600" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold leading-none">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-11 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <span className="text-sm font-semibold text-gray-800">Notifications</span>
                                {unreadCount > 0 && (
                                    <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                                )}
                            </div>

                            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                                {notifs.map((n) => (
                                    <li key={n.id} className={`flex gap-3 px-4 py-3 transition-colors ${n.unread ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}`}>
                                        <div className={`w-9 h-9 rounded-full ${n.avatarBg} flex items-center justify-center text-xs font-bold ${n.avatarColor} shrink-0 mt-0.5`}>
                                            {n.avatar}
                                        </div>

                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <p className="text-xs font-semibold text-gray-800">{n.name}</p>
                                            <p className="text-xs text-gray-500 leading-snug">{n.message}</p>
                                            <p className="text-[11px] text-gray-400">{n.time}</p>
                                        </div>

                                        {n.unread && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="px-4 py-2 border-t border-gray-100 text-center">
                                <button className="text-xs text-blue-600 hover:underline">View all notifications</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}