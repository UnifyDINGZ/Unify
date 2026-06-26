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

const BASE_ITEM = "flex items-center rounded-md py-2 transition-colors duration-200"
const ACTIVE_ITEM = BASE_ITEM + " bg-blue-600 text-white"
const INACTIVE_ITEM = BASE_ITEM + " text-gray-300 hover:text-white hover:bg-gray-700"

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
        <div className={`h-screen border-r border-gray-700 bg-gray-800 shadow-md shadow-gray-900 flex flex-col transition-all duration-300 ease-in-out ${open ? "w-64" : "w-20"}`}>

            <div className={`flex items-center h-16 px-3 ${open ? "justify-between" : "justify-center"}`}>
                {open && (
                    <div className="flex items-center min-w-0 overflow-hidden">
                        <div className={ICON_COL}>
                            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                        </div>
                        <span className="text-xl font-bold whitespace-nowrap ml-2 text-white">
                            pterano
                        </span>
                    </div>
                )}
                <button onClick={() => setOpen(!open)} className="p-1 hover:scale-110 transition text-gray-400 hover:text-white" aria-label={open ? "Collapse sidebar" : "Expand sidebar"} >
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
                    const isActive = i === 0
                    const itemClass = isActive ? ACTIVE_ITEM : INACTIVE_ITEM
                    return (
                        <a key={i} href={item.href} className={itemClass}>
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

            <div className="mt-auto px-3 pb-4 pt-3 border-t border-gray-700">
                <a href="/profile" className="flex items-center rounded-md py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    <div className={ICON_COL}>
                        <div className="w-9 h-9 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400">
                            <MdPerson size={20} />
                        </div>
                    </div>
                    {open && (
                        <div className="ml-2 min-w-0 overflow-hidden">
                            <p className="text-sm font-medium whitespace-nowrap truncate text-gray-100">Drake Delos Reyes</p>
                            <p className="text-xs whitespace-nowrap truncate text-gray-500">Drake@pterano.com</p>
                        </div>
                    )}
                </a>
            </div>

        </div>
    )
}