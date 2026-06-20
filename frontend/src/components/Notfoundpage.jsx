import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen w-full flex flex-col text-[#f5f3ef] font-sans" style={{ background: "radial-gradient(circle at 50% 35%, #0e251d 0%, #071511 50%, #030606 100%)", }}>
            <Hero />
            <Footer />
        </div>
    );
}