import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <Hero />
        <main className="flex-1 p-6">
        </main>
      </div>
    </div>
  )
}