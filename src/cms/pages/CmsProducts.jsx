import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, BarChart2, Package } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

/* Mock product performance data */
const productPerformance = [
  { name: "Urban Hoodie", views: 4200, sales: 342 },
  { name: "Classic Tee", views: 3800, sales: 289 },
  { name: "Slim Chinos", views: 2900, sales: 201 },
  { name: "Gold Chain", views: 2400, sales: 178 },
  { name: "Earbuds", views: 2100, sales: 156 },
  { name: "Sneakers", views: 1800, sales: 134 },
  { name: "Denim Jacket", views: 1600, sales: 112 },
  { name: "Watch", views: 1400, sales: 98 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-white/10 rounded-lg px-4 py-3 shadow-xl text-xs">
      <p className="text-gray-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const CmsProducts = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.productsShowcase });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("productsShowcase", form);
      setSaving(false);
      toast.success("Products showcase saved!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("productsShowcase");
    setForm({ ...content.productsShowcase });
    toast.info("Reset to default.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Products</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products Showcase</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Configure the Bestsellers section on the home page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-lg hover:border-gray-400 dark:hover:border-white/20 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Settings card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <CmsFormCard title="Section Settings" description="Controls the heading and how many products are shown in the Bestsellers section.">
          <CmsField
            label="Section Label"
            placeholder="e.g. Trending"
            value={form.sectionLabel}
            onChange={(e) => set("sectionLabel", e.target.value)}
            hint="Small uppercase label above the title."
          />
          <CmsField
            label="Section Title"
            placeholder="e.g. Bestsellers"
            value={form.sectionTitle}
            onChange={(e) => set("sectionTitle", e.target.value)}
          />

          {/* Slider */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">
              Number of Products to Show
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={2}
                max={8}
                step={1}
                value={form.maxItems}
                onChange={(e) => set("maxItems", Number(e.target.value))}
                className="flex-1 accent-amber-400"
              />
              <span className="text-sm font-bold text-amber-500 w-16 text-right">{form.maxItems} items</span>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 px-0.5">
              {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <span key={n} className={form.maxItems === n ? "text-amber-500 font-bold" : ""}>{n}</span>
              ))}
            </div>
          </div>

          {/* Preview grid */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold">{form.sectionLabel || "Label"}</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">{form.sectionTitle || "Title"}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: form.maxItems }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 h-16 flex items-center justify-center"
                >
                  <span className="text-[10px] text-gray-400">#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </CmsFormCard>
      </motion.div>

      {/* Product performance chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 className="h-5 w-5 text-amber-500" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Product Performance</h3>
            <p className="text-xs text-gray-400 mt-0.5">Views vs sales for top products</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={productPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={40}
            />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="views" name="Views" radius={[4, 4, 0, 0]} maxBarSize={24}>
              {productPerformance.map((_, i) => (
                <Cell key={i} fill={i < form.maxItems ? "#f59e0b" : "#e5e7eb"} />
              ))}
            </Bar>
            <Bar dataKey="sales" name="Sales" radius={[4, 4, 0, 0]} maxBarSize={24}>
              {productPerformance.map((_, i) => (
                <Cell key={i} fill={i < form.maxItems ? "#111827" : "#d1d5db"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-400 mt-3 text-center">
          Highlighted bars = products currently shown in the showcase ({form.maxItems} items)
        </p>
      </motion.div>
    </div>
  );
};

export default CmsProducts;
