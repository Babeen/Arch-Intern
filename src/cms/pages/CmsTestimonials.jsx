import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Star, ChevronDown, ChevronUp, Save, RotateCcw, BarChart2 } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

const empty = () => ({ id: Date.now(), name: "", role: "Verified Buyer", avatar: "", rating: 5, body: "" });

const CmsTestimonials = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [items, setItems] = useState([...content.testimonials]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(false);

  const update = (id, key, val) =>
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, [key]: val } : t)));

  const remove = (id) => setItems((prev) => prev.filter((t) => t.id !== id));

  const add = () => {
    const item = empty();
    setItems((prev) => [...prev, item]);
    setExpanded(item.id);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("testimonials", items);
      setSaving(false);
      toast.success("Testimonials saved!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("testimonials");
    setItems([...content.testimonials]);
    toast.info("Reset to default.");
  };

  /* Derived stats */
  const avgRating = items.length
    ? (items.reduce((s, t) => s + t.rating, 0) / items.length).toFixed(1)
    : "—";

  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    stars: `${r}★`,
    count: items.filter((t) => t.rating === r).length,
  }));

  const radarData = [
    { subject: "5★", value: items.filter((t) => t.rating === 5).length },
    { subject: "4★", value: items.filter((t) => t.rating === 4).length },
    { subject: "3★", value: items.filter((t) => t.rating === 3).length },
    { subject: "2★", value: items.filter((t) => t.rating === 2).length },
    { subject: "1★", value: items.filter((t) => t.rating === 1).length },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Testimonials</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add, edit or remove customer reviews shown on the site.
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

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Total Reviews", value: items.length },
          { label: "Average Rating", value: avgRating },
          { label: "5-Star Reviews", value: items.filter((t) => t.rating === 5).length },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {/* Rating distribution bar */}
        <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Rating Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={ratingDist} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" vertical={false} />
              <XAxis dataKey="stars" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }}
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#f9fafb" }}
              />
              <Bar dataKey="count" name="Reviews" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">Rating Spread</h3>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(107,114,128,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Radar name="Reviews" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Reviews list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <CmsFormCard title={`Reviews (${items.length})`} description="Click a review to expand and edit it.">
          <div className="space-y-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
                >
                  {/* Row header */}
                  <div
                    className="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {item.avatar || item.name.slice(0, 2).toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name || "Unnamed"}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={10} className={i < item.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); remove(item.id); }}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      {expanded === item.id
                        ? <ChevronUp className="h-4 w-4 text-gray-400" />
                        : <ChevronDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>

                  {/* Expanded form */}
                  <AnimatePresence>
                    {expanded === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pt-3 space-y-4 border-t border-gray-100 dark:border-white/5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <CmsField label="Name" placeholder="e.g. Sarah M." value={item.name} onChange={(e) => update(item.id, "name", e.target.value)} />
                            <CmsField label="Role" placeholder="e.g. Verified Buyer" value={item.role} onChange={(e) => update(item.id, "role", e.target.value)} />
                          </div>
                          <CmsField label="Avatar Initials" placeholder="e.g. SM" value={item.avatar} onChange={(e) => update(item.id, "avatar", e.target.value)} hint="2-letter initials shown in the avatar circle." />
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">Rating</label>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button key={s} type="button" onClick={() => update(item.id, "rating", s)} className="transition-transform hover:scale-110">
                                  <Star size={24} className={s <= item.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"} fill="currentColor" />
                                </button>
                              ))}
                            </div>
                          </div>
                          <CmsField label="Review Body" textarea rows={3} placeholder="What did the customer say?" value={item.body} onChange={(e) => update(item.id, "body", e.target.value)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={add}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Add Review
            </button>
          </div>
        </CmsFormCard>
      </motion.div>
    </div>
  );
};

export default CmsTestimonials;
