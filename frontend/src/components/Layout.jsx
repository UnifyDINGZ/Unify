import Navbar from "./Navbar"
import Hero from "./Hero"

export default function Layout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                <Hero />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}