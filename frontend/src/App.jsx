import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";

export default function App() {
  const user = {
    name: "Drake"
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <Hero />

        <main className="flex-1 p-6">
          <Section user={user} />
        </main>
      </div>
    </div>
  );
}