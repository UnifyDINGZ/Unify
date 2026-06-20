import React from "react";
import pteranoLogo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center px-6 py-10 sm:py-12">
                <img src={pteranoLogo} alt="Pterano logo" className="h-10 sm:h-12 w-auto mb-5" />
                <p className="text-sm sm:text-base leading-relaxed text-[#9aa7b4] max-w-xl">
                    Pterano is an AI powered procurement and inventory decision assistant designed for SMEs. Rather than overwhelming business owners with reports and dashboards, Pterano proactively tells them what actions to take what to reorder, when to reorder, which supplier to choose, and which operational risks require immediate attention.
                </p>
            </div>
        </footer>
    );
}