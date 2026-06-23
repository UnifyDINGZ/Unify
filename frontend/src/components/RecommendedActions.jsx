import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Pencil,
  Clock,
  X,
  Image as ImageIcon,
} from "lucide-react";

const CATEGORIES = {
  urgent: { label: "Urgent", badge: "bg-red-50 text-red-600" },
  saveMoney: { label: "Save Money", badge: "bg-amber-50 text-amber-700" },
  reduceWaste: { label: "Reduce Waste", badge: "bg-orange-50 text-orange-600" },
  costSaving: { label: "Cost Saving", badge: "bg-emerald-50 text-emerald-700" },
};

const ACTIONS = [
  {
    id: "cement-reorder",
    category: "urgent",
    image: "https://ph.all.biz/img/ph/catalog/20183.jpeg",
    title: "Reorder Portland Cement",
    subtitle: "Stockout risk in 2 days",
    subtitleEmphasis: "2 days",
    impact: { kind: "Protect", amount: 42000 },
    reason:
      "Sales increased 18% this week and supplier delivery time is 1 day.",
    recommendation: "Order 200 bags",
    primaryAction: "Approve Order",
  },
  {
    id: "steel-delay",
    category: "saveMoney",
    image: "",
    title: "Delay Steel Bar purchase",
    subtitle: "Delay by 4 days",
    impact: { kind: "Save", amount: 8500 },
    reason: "Demand is lower than usual.",
    recommendation: "Delay purchase",
    primaryAction: "Accept",
  },
  {
    id: "paint-reduce",
    category: "reduceWaste",
    image: "",
    title: "Reduce Paint (Glossy White)",
    subtitle: "Reduce next order by 20%",
    impact: { kind: "Save", amount: 17000 },
    reason: "Demand declined 35% over the past 14 days.",
    recommendation: "Adjust next order",
    primaryAction: "Adjust",
  },
  {
    id: "supplier-switch",
    category: "costSaving",
    image: "",
    title: "Switch to Supplier B",
    subtitle: "6% cheaper this week",
    impact: { kind: "Save", amount: 5200 },
    reason: "Same product, lower price and high reliability.",
    recommendation: "View comparison",
    primaryAction: "Compare",
  },
];

const peso = (n) =>
  `₱${n.toLocaleString("en-PH", { maximumFractionDigits: 0 })}`;

function PriorityBadge({ category }) {
  const { label, badge } = CATEGORIES[category];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badge}`}
    >
      {label}
    </span>
  );
}

function ProductThumb({ src, alt }) {
  return (
    <div className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg bg-slate-100">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <ImageIcon size={18} className="text-slate-300" />
      )}
    </div>
  );
}

function SplitActionButton({ label, onPrimary, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const menu = [
    { key: "edit", label: "Edit details", Icon: Pencil },
    { key: "snooze", label: "Snooze", Icon: Clock },
    { key: "dismiss", label: "Dismiss", Icon: X },
  ];

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={onPrimary}
        className="rounded-l-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        {label}
      </button>
      <button
        type="button"
        aria-label="More actions"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-r-lg border border-l-0 border-slate-200 bg-white px-2 py-2 text-blue-600 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {menu.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setOpen(false);
                onSelect?.(key);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              <Icon size={15} className="text-slate-400" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionRow({ action, onApprove, onMenuSelect }) {
  return (
    <tr className="border-t border-slate-100">
      <td className="px-6 py-5 align-top">
        <PriorityBadge category={action.category} />
      </td>

      <td className="px-6 py-5 align-top">
        <div className="flex items-center gap-3">
          <ProductThumb src={action.image} alt={action.title} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-800">
              {action.title}
            </div>
            <div className="mt-0.5 text-sm text-slate-500">
              {action.subtitleEmphasis ? (
                <>
                  {action.subtitle.split(action.subtitleEmphasis)[0]}
                  <span className="font-semibold text-red-600">
                    {action.subtitleEmphasis}
                  </span>
                  {action.subtitle.split(action.subtitleEmphasis)[1]}
                </>
              ) : (
                action.subtitle
              )}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="text-sm text-slate-500">{action.impact.kind}</div>
        <div className="mt-0.5 text-sm font-semibold text-emerald-600">
          {peso(action.impact.amount)}
        </div>
      </td>

      <td className="px-6 py-5 align-top">
        <p className="max-w-xs text-sm leading-snug text-slate-500">
          {action.reason}
        </p>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="mb-1.5 text-md font-semibold text-slate-800">
          {action.recommendation}
        </div>
        <SplitActionButton
          label={action.primaryAction}
          onPrimary={() => onApprove?.(action.id)}
          onSelect={(key) => onMenuSelect?.(action.id, key)}
        />
      </td>
    </tr>
  );
}

export default function RecommendedActionsPanel({
  actions = ACTIONS,
  title = "Today's recommended actions",
  onApprove,
  onMenuSelect,
  onViewAll,
}) {
  return (
    <>
      <div className="w-full">
        <header className="flex items-center justify-between px-6 pb-4 pt-5">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all actions
          </button>
        </header>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-md font-semibold text-slate-500">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Impact
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Recommended
                  </th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <ActionRow
                    key={action.id}
                    action={action}
                    onApprove={onApprove}
                    onMenuSelect={onMenuSelect}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
