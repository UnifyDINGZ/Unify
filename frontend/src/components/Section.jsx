import { useState, useRef, useEffect } from "react";
import {
  AlertCircle,
  Tag,
  UserPlus,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RecommendedActions from "./RecommendedActions";
import DashboardBottom from "./DashboardBottom";

const cards = [
  {
    count: "3",
    title: "Urgent actions",
    subtitle: "Need attention",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    countColor: "text-red-600",
    borderAccent: "border-red-100",
  },
  {
    count: "2",
    title: "Money-saving opportunities",
    subtitle: "Available",
    icon: Tag,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    countColor: "text-orange-600",
    borderAccent: "border-orange-100",
  },
  {
    count: "1",
    title: "Supplier opportunities",
    subtitle: "Available",
    icon: UserPlus,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    countColor: "text-green-600",
    borderAccent: "border-green-100",
  },
  {
    count: "₱186,500",
    title: "Potential impact",
    subtitle: "Protected or saved",
    icon: Wallet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    countColor: "text-blue-700",
    borderAccent: "border-blue-100",
    isAmount: true,
  },
];

function Calendar({ selectedDate, onSelect, onClose }) {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) =>
    d &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === d;

  const isToday = (d) => {
    const t = new Date();
    return (
      d &&
      t.getFullYear() === year &&
      t.getMonth() === month &&
      t.getDate() === d
    );
  };

  return (
    <div className="absolute right-0 top-7 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-72">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-xs text-gray-400 font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => (
          <button
            key={i}
            disabled={!d}
            onClick={() => {
              onSelect(new Date(year, month, d));
              onClose();
            }}
            className={`h-8 w-8 mx-auto rounded-full text-xs font-medium transition-colors ${!d ? "invisible" : ""} ${isSelected(d) ? "bg-blue-600 text-white" : ""} ${isToday(d) && !isSelected(d) ? "border border-blue-400 text-blue-600" : ""} ${d && !isSelected(d) ? "hover:bg-gray-100 text-gray-700" : ""}`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`bg-white rounded-2xl border ${card.borderAccent} shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200`}
          >
            <div
              className={`w-10 h-10 rounded-full ${card.iconBg} flex items-center justify-center`}
            >
              <Icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <span
                className={`${card.isAmount ? "text-2xl" : "text-3xl"} font-bold tracking-tight ${card.countColor} leading-none`}
              >
                {card.count}
              </span>
              <p className="text-sm font-bold text-gray-800 leading-snug">
                {card.title}
              </p>
              <p className="text-xs text-gray-600">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Section({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-gray-900 font-semibold font-sans">
            Good morning, {user.name}
          </h1>
          <p className="text-sm text-gray-700">
            Here are your recommended actions for today.
          </p>
        </div>
        <div className="relative" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar((v) => !v)}
            className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors cursor-pointer"
          >
            Date as of {selectedDate.toLocaleDateString()}
          </button>

          {showCalendar && (
            <Calendar
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>

      <MetricCards />

      <RecommendedActions />

      <DashboardBottom />
    </div>
  );
}
