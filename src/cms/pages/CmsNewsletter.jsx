import { useState } from "react";
import { motion } from "framer-motion";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

const CmsNewsletter = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.newsletter });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("newsletter", form);
      setSaving(false);
      toast.success("Newsletter section saved!");
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Section</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit the newsletter signup section at the bottom of the home page.</p>
      </motion.div>

      <CmsFormCard
        title="Copy"
        onSave={handleSave}
        onReset={() => { resetSection("newsletter"); setForm({ ...content.newsletter }); toast.info("Reset to default."); }}
        saving={saving}
      >
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

      {/* Preview */}
      <CmsFormCard title="Preview">
        <div className="relative rounded-lg bg-gray-950 text-white px-8 py-10 text-center overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">{form.badge}</p>
          <p className="text-xl font-bold">{form.heading}</p>
          <p className="text-xs text-white/60 mt-2 max-w-xs mx-auto">{form.subheading}</p>
          <div className="mt-4 flex gap-2 max-w-xs mx-auto">
            <div className="flex-1 bg-white/10 border border-white/20 rounded-md h-8" />
            <span className="bg-amber-400 text-gray-900 text-xs font-semibold px-4 rounded-md flex items-center">{form.buttonText}</span>
          </div>
        </div>
      </CmsFormCard>
    </div>
  );
};

export default CmsNewsletter;
