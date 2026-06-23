import { useState } from "react";
import {
  Sparkles,
  MessageCircle,
  Send,
  ShoppingCart,
  Package,
  AlertTriangle,
  Target,
  PlusCircle,
} from "lucide-react";

const recentActivity = [
  {
    icon: ShoppingCart,
    title: "Purchase order approved for Portland Cement",
    time: "May 20, 2025 8:15 AM",
  },
  {
    icon: Package,
    title: "Inventory updated for 2 products",
    time: "May 20, 2025 7:45 AM",
  },
];

function Stat({
  icon: Icon,
  iconBg,
  iconColor,
  count,
  countColor,
  label,
  sub,
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-3.5">
      <div className="flex items-center gap-2">
        <span
          className={`w-7 h-7 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
        >
          <Icon size={15} className={iconColor} strokeWidth={2.2} />
        </span>
        <span className={`text-2xl font-bold leading-none ${countColor}`}>
          {count}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-800 mt-2.5">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}

export default function PteranoDashboardBottom() {
  const [question, setQuestion] = useState("");

  const handleAsk = () => {
    if (!question.trim()) return;

    setQuestion("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Inventory summary
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View inventory
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-start">
            <Stat
              icon={AlertTriangle}
              iconBg="bg-red-100"
              iconColor="text-red-500"
              count="3"
              countColor="text-red-500"
              label="At risk"
              sub="Need attention"
            />
            <Stat
              icon={Target}
              iconBg="bg-amber-100"
              iconColor="text-amber-500"
              count="5"
              countColor="text-amber-500"
              label="To monitor"
              sub="Monitor closely"
            />
            <Stat
              icon={PlusCircle}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              count="18"
              countColor="text-gray-900"
              label="Healthy"
              sub="Well stocked"
            />

            {/* Savings — no icon circle, blue highlight box */}
            <div className="bg-blue-50 rounded-xl p-3.5">
              <div className="flex items-center h-7">
                <span className="text-xl font-bold text-blue-600 leading-none">
                  ₱23,000
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 mt-2.5">
                Savings opportunities
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Potential savings</p>
            </div>
          </div>
        </section>

        {/* AI Insight */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={18} className="text-blue-500" strokeWidth={2.2} />
            <h2 className="text-base font-semibold text-gray-900">
              AI Insight
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-between gap-5">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">
                Rainy season expected in 3 weeks.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Demand for{" "}
                <span className="font-bold text-gray-900">Umbrellas</span> may
                increase by <span className="font-bold text-gray-900">34%</span>
                .
              </p>
              <p className="text-sm font-bold text-gray-900 leading-relaxed">
                Suggested action: Increase umbrella inventory by 25%.
              </p>
            </div>
            <button className="shrink-0 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              View recommendation
            </button>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Ask Pterano */}
        <section className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <MessageCircle
              size={18}
              className="text-gray-800"
              strokeWidth={2.2}
            />
            <h2 className="text-base font-semibold text-gray-900">
              Ask Pterano
            </h2>
          </div>

          <div className="flex-1 flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Ask anything about your inventory..."
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-4 pr-14 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-shadow"
              />
              <button
                onClick={handleAsk}
                aria-label="Send"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Send size={17} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Recent activity
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon
                    size={18}
                    className="text-gray-400 mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {a.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
