import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Save, RotateCcw, Image as ImageIcon, Type, MousePointer } from "lucide-react";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import ImageUploadField from "../components/ImageUploadField";
import { useToast } from "../../context/ToastContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};

const CmsHero = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.hero });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("image");

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

  const tabs = [
    { id: "image", label: "Background", icon: ImageIcon },
    { id: "copy", label: "Copy & CTAs", icon: Type },
    { id: "preview", label: "Preview", icon: Eye },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Hero</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Section</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Edit the full-screen hero at the top of the home page.
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

      {/* Tabs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#111118] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      {activeTab === "image" && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <CmsFormCard title="Background Image" description="Recommended: 1920×1080px or wider. Leave blank to use the default.">
            <ImageUploadField
              label="Hero Background"
              value={form.backgroundImage}
              onChange={(v) => set("backgroundImage", v)}
              hint="Upload a file or paste a URL."
            />
          </CmsFormCard>
        </motion.div>
      )}

      {activeTab === "copy" && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <CmsFormCard title="Copy & Call-to-Actions" description="Text content and button labels shown on the hero.">
            <div className="space-y-5">
              <CmsField
                label="Badge Text"
                placeholder="e.g. New Arrivals — SS 2025"
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                hint="Small label displayed above the headline."
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <CmsField
                  label="Headline"
                  placeholder="e.g. Define Your"
                  value={form.heading}
                  onChange={(e) => set("heading", e.target.value)}
                />
                <CmsField
                  label="Headline — italic part"
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
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                    <MousePointer className="h-3 w-3" /> Primary CTA
                  </label>
                  <input
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    placeholder="e.g. Shop Now"
                    value={form.primaryCta}
                    onChange={(e) => set("primaryCta", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                    <MousePointer className="h-3 w-3" /> Secondary CTA
                  </label>
                  <input
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    placeholder="e.g. Explore Collections"
                    value={form.secondaryCta}
                    onChange={(e) => set("secondaryCta", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CmsFormCard>
        </motion.div>
      )}

      {activeTab === "preview" && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-2">
            <Eye className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Preview</h3>
          </div>
          <div className="p-6">
            <div className="relative rounded-xl overflow-hidden bg-gray-900 h-64 flex items-center justify-center text-center px-6">
              {form.backgroundImage && (
                <img src={form.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              <div className="relative z-10 text-white space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-semibold">{form.badge || "Badge text"}</p>
                <p className="text-3xl font-bold leading-tight">
                  {form.heading || "Headline"}{" "}
                  <span className="italic font-light">{form.headingItalic || "italic"}</span>
                </p>
                <p className="text-xs text-white/70 max-w-sm mx-auto">{form.subheading || "Subheading text"}</p>
                <div className="flex gap-3 justify-center pt-1">
                  <span className="text-xs bg-white text-gray-900 px-5 py-2 rounded-full font-semibold">{form.primaryCta || "Primary CTA"}</span>
                  <span className="text-xs border-2 border-white/60 text-white px-5 py-2 rounded-full font-semibold">{form.secondaryCta || "Secondary CTA"}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CmsHero;