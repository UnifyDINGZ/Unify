import React from "react";
import barney from "../assets/images/barney.png";

export default function Hero() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20">
            <div className="w-full max-w-xl flex items-center justify-center">
                <img src={barney} alt="Cartoon dinosaur" className="w-48 sm:w-64 h-auto object-contain" />
            </div>
            <h1 className="mt-8 font-extrabold tracking-tight leading-tight text-[#f5f3ef] text-3xl sm:text-4xl md:text-5xl">Oh welp, our dino's dead</h1>
            <p className="mt-3 text-base sm:text-lg text-[#9aa7b4]">Guess we'll wait for the egg to hatch</p>
        </main>
    );
}