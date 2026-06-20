import React from "react";

export default function Navbar() {
    const navItems = ["Home", "Blog", "Resources", "Contact"];

    return (
        <header className="w-full border-b border-white/10">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5 sm:px-8">
                <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#f5f3ef]">Pterano</p>
                <ul className="flex items-center gap-5 sm:gap-8 list-none m-0 p-0">
                    {navItems.map((item) => (
                        <li key={item}>
                            <p className="text-sm sm:text-base text-[#cbd3dc] hover:text-[#f5f3ef] transition-colors cursor-pointer">{item}</p>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}