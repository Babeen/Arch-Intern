import { useState } from "react";
import { motion } from "framer-motion";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products Showcase</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure the Bestsellers section on the home page.</p>
      </motion.div>

      <CmsFormCard
        title="Section Settings"
        description="Controls the heading and how many products are shown."
        onSave={handleSave}
        onReset={() => { resetSection("productsShowcase"); setForm({ ...content.productsShowcase }); toast.info("Reset to default."); }}
        saving={saving}
      >
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
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">
            Number of Products to Show
          </label>
          <input
            type="range"
            min={2}
            max={8}
            step={1}
            value={form.maxItems}
            onChange={(e) => set("maxItems", Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>2</span>
            <span className="font-semibold text-amber-500">{form.maxItems} products</span>
            <span>8</span>
          </div>
        </div>
      </CmsFormCard>

      {/* Preview */}
      <CmsFormCard title="Preview">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 font-semibold">{form.sectionLabel}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{form.sectionTitle}</p>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {Array.from({ length: form.maxItems }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 h-16 flex items-center justify-center">
                <span className="text-[10px] text-gray-400">Product {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </CmsFormCard>
    </div>
  );
};

export default CmsProducts;
