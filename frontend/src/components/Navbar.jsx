import { useState } from "react"
import logo from "../assets/logo1.png"
import {
    MdHome,
    MdInventory,
    MdBusiness,
    MdChat,
    MdSettings,
    MdMenu,
    MdPerson
} from "react-icons/md"

const ICON_COL = "w-10 flex items-center justify-center"

export default function Navbar() {
    const [open, setOpen] = useState(true)

    const menu = [
        { icon: MdHome, label: "Dashboard", href: "/dashboard" },
        { icon: MdInventory, label: "Inventory", href: "/inventory" },
        { icon: MdBusiness, label: "Suppliers", href: "/suppliers" },
        { icon: MdChat, label: "Ask Pterano", href: "/sales" },
        { icon: MdSettings, label: "Settings", href: "/settings" },
    ]

    return (
        <div className={`h-screen border-r border-gray-200 shadow-md shadow-gray-300 flex flex-col transition-all duration-300 ease-in-out ${open ? "w-64" : "w-20"}`}>
            <div className={`flex items-center h-16 px-3 ${open ? "justify-between" : "justify-center"}`}>
                {open && (
                    <div className="flex items-center min-w-0 overflow-hidden">
                        <div className={ICON_COL}>
                            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                        </div>
                        <span className="text-xl font-bold whitespace-nowrap ml-2">pterano</span>
                    </div>
                )}

                <button onClick={() => setOpen(!open)} className="p-1 hover:scale-110 transition" aria-label={open ? "Collapse sidebar" : "Expand sidebar"}>
                    <MdMenu size={22} />
                </button>
            </div>
            <div className="flex flex-col gap-2 mt-2 px-3">
                {!open && (
                    <div className="flex items-center py-2">
                        <div className={ICON_COL}>
                            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                        </div>
                    </div>
                )}

                {menu.map((item, i) => {
                    const Icon = item.icon

                    return (
                        <a key={i} href={item.href} className="flex items-center rounded-md py-2 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-200">
                            <div className={ICON_COL}>
                                <Icon size={22} />
                            </div>

                            {open && (
                                <span className="whitespace-nowrap ml-2">
                                    {item.label}
                                </span>
                            )}
                        </a>
                    )
                })}
            </div>

            <div className="mt-auto px-3 pb-4 pt-3 border-t border-gray-200">
                <a href="/profile" className="flex items-center rounded-md py-2 hover:bg-gray-50 transition-colors duration-200">
                    <div className={ICON_COL}>
                        <div className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
                            <MdPerson size={20} />
                        </div>
                    </div>

                    {open && (
                        <div className="ml-2 min-w-0 overflow-hidden">
                            <p className="text-sm font-medium whitespace-nowrap truncate">Drake Delos Reyes</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap truncate">Drake@pterano.com</p>
                        </div>
                    )}
                </a>
            </div>
        </div>
    )
}