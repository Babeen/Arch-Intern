import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ToggleLeft, ToggleRight, Save, RotateCcw, PieChart as PieIcon } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

const empty = () => ({ id: Date.now(), title: "", active: true, color: "amber" });

const colorOptions = [
  { id: "amber", label: "Amber", bg: "bg-amber-400", hex: "#f59e0b" },
  { id: "gray", label: "Dark", bg: "bg-gray-800", hex: "#1f2937" },
  { id: "green", label: "Green", bg: "bg-green-500", hex: "#22c55e" },
  { id: "red", label: "Red", bg: "bg-red-500", hex: "#ef4444" },
  { id: "blue", label: "Blue", bg: "bg-blue-500", hex: "#3b82f6" },
];

const colorClass = (color) => ({
  amber: "bg-amber-400 text-gray-900",
  gray: "bg-gray-800 text-white",
  green: "bg-green-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
}[color] || "bg-amber-400 text-gray-900");

const colorHex = (color) => colorOptions.find((c) => c.id === color)?.hex || "#f59e0b";

const CmsPromotions = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [items, setItems] = useState([...content.promotions]);
  const [saving, setSaving] = useState(false);

  const update = (id, key, val) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: val } : p)));

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const add = () => setItems((prev) => [...prev, empty()]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("promotions", items);
      setSaving(false);
      toast.success("Promotions saved!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("promotions");
    setItems([...content.promotions]);
    toast.info("Reset to default.");
  };

  const activeCount = items.filter((i) => i.active).length;
  const inactiveCount = items.length - activeCount;

  const pieData = [
    { name: "Active", value: activeCount || 0, color: "#f59e0b" },
    { name: "Inactive", value: inactiveCount || 0, color: "#e5e7eb" },
  ].filter((d) => d.value > 0);

  const colorBreakdown = colorOptions.map((c) => ({
    name: c.label,
    value: items.filter((i) => i.color === c.id).length,
    color: c.hex,
  })).filter((d) => d.value > 0);

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Promotions</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promotions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage promotional banners shown at the top of the site.
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

      {/* Stats + Charts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{items.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total Banners</p>
        </div>
        <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{activeCount}</p>
          <p className="text-xs text-gray-400 mt-1">Active Banners</p>
        </div>
        <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-gray-400">{inactiveCount}</p>
          <p className="text-xs text-gray-400 mt-1">Inactive Banners</p>
        </div>
      </motion.div>

      {/* Charts */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {/* Active/Inactive pie */}
          <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieIcon className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active vs Inactive</h3>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }}
                  itemStyle={{ color: "#f9fafb" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Color breakdown pie */}
          <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Color Breakdown</h3>
            {colorBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={colorBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value">
                    {colorBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }}
                    itemStyle={{ color: "#f9fafb" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[140px] flex items-center justify-center text-xs text-gray-400">No data</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Banners list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <CmsFormCard
          title={`Banners (${items.length})`}
          description="Only active banners are shown. The first active banner is displayed at the top of the site."
        >
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={`border rounded-xl p-4 space-y-3 transition-colors ${
                    item.active
                      ? "border-amber-200 dark:border-amber-400/20 bg-amber-50/50 dark:bg-amber-400/5"
                      : "border-gray-100 dark:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <CmsField
                        placeholder="e.g. Free Shipping on Orders Over $50"
                        value={item.title}
                        onChange={(e) => update(item.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => update(item.id, "active", !item.active)}
                        className={`transition-colors ${item.active ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                        title={item.active ? "Active — click to deactivate" : "Inactive — click to activate"}
                      >
                        {item.active
                          ? <ToggleRight className="h-7 w-7" />
                          : <ToggleLeft className="h-7 w-7" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Color picker */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Color:</span>
                    <div className="flex gap-2">
                      {colorOptions.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update(item.id, "color", c.id)}
                          title={c.label}
                          className={`w-5 h-5 rounded-full transition-all ${c.bg} ${
                            item.color === c.id ? "ring-2 ring-offset-2 ring-amber-400 scale-110" : "opacity-60 hover:opacity-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className={`rounded-lg px-4 py-2.5 text-xs font-semibold text-center transition-opacity ${colorClass(item.color)} ${!item.active ? "opacity-40" : ""}`}>
                    {item.title || "Banner preview text"}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={add}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Add Banner
            </button>
          </div>
        </CmsFormCard>
      </motion.div>
    </div>
  );
};

export default CmsPromotions;
