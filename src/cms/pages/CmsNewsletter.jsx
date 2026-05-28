import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Eye, TrendingUp, Users, Mail, MousePointer } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

/* Mock subscriber growth data */
const subscriberData = [
  { month: "Jan", subscribers: 1200, opens: 840 },
  { month: "Feb", subscribers: 1580, opens: 1102 },
  { month: "Mar", subscribers: 1940, opens: 1358 },
  { month: "Apr", subscribers: 2310, opens: 1617 },
  { month: "May", subscribers: 2780, opens: 1946 },
  { month: "Jun", subscribers: 3120, opens: 2184 },
  { month: "Jul", subscribers: 3540, opens: 2478 },
  { month: "Aug", subscribers: 3980, opens: 2786 },
  { month: "Sep", subscribers: 4200, opens: 2940 },
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

const CmsNewsletter = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.newsletter });
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("newsletter", form);
      setSaving(false);
      toast.success("Newsletter section saved!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("newsletter");
    setForm({ ...content.newsletter });
    toast.info("Reset to default.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Newsletter</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Section</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Edit the newsletter signup section at the bottom of the home page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border rounded-lg transition-colors ${
                showPreview
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                  : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
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

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Total Subscribers", value: "4,200", icon: Users, color: "text-amber-500 bg-amber-50 dark:bg-amber-400/10" },
          { label: "Avg Open Rate", value: "70%", icon: Mail, color: "text-blue-500 bg-blue-50 dark:bg-blue-400/10" },
          { label: "Click-Through Rate", value: "12.4%", icon: MousePointer, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Subscriber growth chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Subscriber Growth</h3>
              <p className="text-xs text-gray-400 mt-0.5">Subscribers & email opens over time</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10 px-2.5 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" /> +250% YTD
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={subscriberData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#111827" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#111827" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="subscribers" name="Subscribers" stroke="#f59e0b" strokeWidth={2.5} fill="url(#subGrad)" dot={false} activeDot={{ r: 5, fill: "#f59e0b" }} />
            <Area type="monotone" dataKey="opens" name="Opens" stroke="#374151" strokeWidth={2} fill="url(#openGrad)" dot={false} activeDot={{ r: 4, fill: "#374151" }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <CmsFormCard title="Section Copy" description="Edit the text content of the newsletter signup section.">
          <CmsField
            label="Badge"
            placeholder="e.g. Exclusive Access"
            value={form.badge}
            onChange={(e) => set("badge", e.target.value)}
          />
          <CmsField
            label="Heading"
            placeholder="e.g. Join the Inner Circle"
            value={form.heading}
            onChange={(e) => set("heading", e.target.value)}
          />
          <CmsField
            label="Subheading"
            textarea
            rows={2}
            placeholder="Supporting description…"
            value={form.subheading}
            onChange={(e) => set("subheading", e.target.value)}
          />
          <CmsField
            label="Button Text"
            placeholder="e.g. Subscribe"
            value={form.buttonText}
            onChange={(e) => set("buttonText", e.target.value)}
          />
        </CmsFormCard>
      </motion.div>

      {/* Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-2">
            <Eye className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Preview</h3>
          </div>
          <div className="p-6">
            <div className="relative rounded-xl bg-gray-950 text-white px-8 py-12 text-center overflow-hidden">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2 relative z-10">{form.badge || "Badge"}</p>
              <p className="text-2xl font-bold relative z-10">{form.heading || "Heading"}</p>
              <p className="text-xs text-white/60 mt-2 max-w-xs mx-auto relative z-10">{form.subheading || "Subheading"}</p>
              <div className="mt-5 flex gap-2 max-w-xs mx-auto relative z-10">
                <div className="flex-1 bg-white/10 border border-white/20 rounded-lg h-9" />
                <span className="bg-amber-400 text-gray-900 text-xs font-semibold px-5 rounded-lg flex items-center whitespace-nowrap">
                  {form.buttonText || "Subscribe"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CmsNewsletter;
