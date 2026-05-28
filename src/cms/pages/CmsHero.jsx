import { useState } from "react";
import { motion } from "framer-motion";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import ImageUploadField from "../components/ImageUploadField";
import { useToast } from "../../context/ToastContext";

const CmsHero = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.hero });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("hero", form);
      setSaving(false);
      toast.success("Hero section saved!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("hero");
    setForm({ ...content.hero });
    toast.info("Hero section reset to default.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Section</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit the full-screen hero that appears at the top of the home page.</p>
      </motion.div>

      {/* Background image */}
      <CmsFormCard title="Background Image" description="Recommended: 1920×1080px or wider.">
        <ImageUploadField
          label="Hero Background"
          value={form.backgroundImage}
          onChange={(v) => set("backgroundImage", v)}
          hint="Upload a file or paste a URL. Leave blank to use the default."
        />
      </CmsFormCard>

      {/* Copy */}
      <CmsFormCard
        title="Copy & CTAs"
        description="Text content and call-to-action buttons."
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <CmsField
          label="Badge Text"
          placeholder="e.g. New Arrivals — SS 2025"
          value={form.badge}
          onChange={(e) => set("badge", e.target.value)}
          hint="Small label above the headline."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <CmsField
            label="Headline"
            placeholder="e.g. Define Your"
            value={form.heading}
            onChange={(e) => set("heading", e.target.value)}
          />
          <CmsField
            label="Headline (italic part)"
            placeholder="e.g. Urban Edge"
            value={form.headingItalic}
            onChange={(e) => set("headingItalic", e.target.value)}
          />
        </div>
        <CmsField
          label="Subheading"
          textarea
          rows={2}
          placeholder="Supporting description text…"
          value={form.subheading}
          onChange={(e) => set("subheading", e.target.value)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <CmsField
            label="Primary CTA"
            placeholder="e.g. Shop Now"
            value={form.primaryCta}
            onChange={(e) => set("primaryCta", e.target.value)}
          />
          <CmsField
            label="Secondary CTA"
            placeholder="e.g. Explore Collections"
            value={form.secondaryCta}
            onChange={(e) => set("secondaryCta", e.target.value)}
          />
        </div>
      </CmsFormCard>

      {/* Live preview */}
      <CmsFormCard title="Preview">
        <div className="relative rounded-lg overflow-hidden bg-gray-900 h-48 flex items-center justify-center text-center px-6">
          {form.backgroundImage && (
            <img src={form.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          )}
          <div className="relative z-10 text-white space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-semibold">{form.badge}</p>
            <p className="text-2xl font-bold leading-tight">
              {form.heading} <span className="italic font-light">{form.headingItalic}</span>
            </p>
            <p className="text-xs text-white/70 max-w-xs mx-auto">{form.subheading}</p>
            <div className="flex gap-2 justify-center pt-1">
              <span className="text-xs bg-white text-gray-900 px-3 py-1 rounded-full font-semibold">{form.primaryCta}</span>
              <span className="text-xs border border-white/60 text-white px-3 py-1 rounded-full font-semibold">{form.secondaryCta}</span>
            </div>
          </div>
        </div>
      </CmsFormCard>
    </div>
  );
};

export default CmsHero;
