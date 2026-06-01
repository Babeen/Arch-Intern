import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Type, Eye } from "lucide-react";
import { useCms } from "../context/CmsContext";
import { useToast } from "../../context/ToastContext";

const BODY_FONTS = [
  { name: "Outfit", label: "Outfit", category: "Geometric Sans", preview: "Modern & Clean" },
  { name: "Inter", label: "Inter", category: "Humanist Sans", preview: "Neutral & Readable" },
  { name: "DM Sans", label: "DM Sans", category: "Geometric Sans", preview: "Friendly & Open" },
  { name: "Raleway", label: "Raleway", category: "Elegant Sans", preview: "Stylish & Refined" },
  { name: "Josefin Sans", label: "Josefin Sans", category: "Geometric Sans", preview: "Geometric & Bold" },
];

const DISPLAY_FONTS = [
  { name: "Cormorant Garamond", label: "Cormorant Garamond", category: "Luxury Serif", preview: "Editorial & Elegant" },
  { name: "Playfair Display", label: "Playfair Display", category: "Transitional Serif", preview: "Classic & Refined" },
  { name: "Outfit", label: "Outfit", category: "Geometric Sans", preview: "Modern & Minimal" },
  { name: "Raleway", label: "Raleway", category: "Elegant Sans", preview: "Stylish & Refined" },
  { name: "Josefin Sans", label: "Josefin Sans", category: "Geometric Sans", preview: "Geometric & Bold" },
];

const FONT_SIZES = [
  { value: "14", label: "Small (14px)" },
  { value: "15", label: "Compact (15px)" },
  { value: "16", label: "Default (16px)" },
  { value: "17", label: "Comfortable (17px)" },
  { value: "18", label: "Large (18px)" },
];

const LETTER_SPACINGS = [
  { value: "tight", label: "Tight" },
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Wide" },
];

const HEADING_WEIGHTS = [
  { value: "400", label: "Regular" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
];

const FontCard = ({ font, isSelected, onSelect, previewText }) => (
  <button
    onClick={() => onSelect(font.name)}
    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
      isSelected
        ? "border-amber-400 bg-amber-50 dark:bg-amber-400/5"
        : "border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 bg-white dark:bg-[#111118]"
    }`}
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
          {font.category}
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{font.label}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
        isSelected ? "border-amber-400 bg-amber-400" : "border-gray-300 dark:border-gray-600"
      }`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </div>
    <p
      className="text-2xl leading-tight text-gray-800 dark:text-gray-200"
      style={{ fontFamily: `'${font.name}', serif` }}
    >
      {previewText}
    </p>
    <p
      className="text-xs text-gray-400 mt-1.5"
      style={{ fontFamily: `'${font.name}', sans-serif` }}
    >
      {font.preview} — Aa Bb Cc 123
    </p>
  </button>
);

const CmsTypography = () => {
  const { content, updateSection, resetSection } = useCms();
  const toast = useToast();
  const [form, setForm] = useState({ ...content.typography });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateSection("typography", form);
      setSaving(false);
      toast.success("Typography settings saved and applied!");
    }, 400);
  };

  const handleReset = () => {
    resetSection("typography");
    setForm({ ...content.typography });
    toast.info("Typography reset to default.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS / Typography</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Typography Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Control the fonts used across the entire storefront. Changes apply instantly.
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
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-amber-400 text-gray-900 rounded-full hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? "Applying…" : "Apply Changes"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Live preview banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-gray-950 rounded-xl p-6 border border-white/5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-4 w-4 text-amber-400" />
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Live Preview</p>
        </div>
        <div className="space-y-2">
          <h1
            className="text-white leading-tight"
            style={{ fontFamily: `'${form.displayFont}', serif`, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: form.headingWeight }}
          >
            Define Your <span className="italic font-light">Urban Edge</span>
          </h1>
          <p
            className="text-white/60 max-w-lg"
            style={{ fontFamily: `'${form.bodyFont}', sans-serif`, fontSize: `${form.baseFontSize}px`, letterSpacing: form.letterSpacing === "wide" ? "0.04em" : form.letterSpacing === "tight" ? "-0.01em" : "0.01em" }}
          >
            Premium streetwear & contemporary fashion — crafted for the modern individual. Browse our latest collection.
          </p>
          <div className="flex gap-3 pt-2">
            <span
              className="text-xs bg-amber-400 text-gray-900 px-5 py-2 rounded-full font-semibold"
              style={{ fontFamily: `'${form.bodyFont}', sans-serif` }}
            >
              Shop Now
            </span>
            <span
              className="text-xs border border-white/30 text-white px-5 py-2 rounded-full font-semibold"
              style={{ fontFamily: `'${form.bodyFont}', sans-serif` }}
            >
              Explore
            </span>
          </div>
        </div>
      </motion.div>

      {/* Body Font */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <Type className="h-4 w-4 text-amber-500" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Body Font
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Used for paragraphs, labels, buttons, and UI text.</p>
          </div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BODY_FONTS.map((font) => (
            <FontCard
              key={font.name}
              font={font}
              isSelected={form.bodyFont === font.name}
              onSelect={(name) => set("bodyFont", name)}
              previewText="The quick brown fox"
            />
          ))}
        </div>
      </motion.div>

      {/* Display Font */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <Type className="h-4 w-4 text-amber-500" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Display / Heading Font
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Used for all h1–h6 headings and hero text.</p>
          </div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DISPLAY_FONTS.map((font) => (
            <FontCard
              key={font.name}
              font={font}
              isSelected={form.displayFont === font.name}
              onSelect={(name) => set("displayFont", name)}
              previewText="Define Your Style"
            />
          ))}
        </div>
      </motion.div>

      {/* Fine-tuning */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Fine-Tuning
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Adjust size, weight, and spacing.</p>
        </div>
        <div className="p-6 grid sm:grid-cols-3 gap-6">
          {/* Base font size */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
              Base Font Size
            </label>
            <div className="space-y-2">
              {FONT_SIZES.map((s) => (
                <label key={s.value} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.baseFontSize === s.value ? "border-amber-400 bg-amber-400" : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {form.baseFontSize === s.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" name="fontSize" value={s.value} checked={form.baseFontSize === s.value} onChange={() => set("baseFontSize", s.value)} className="sr-only" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Letter spacing */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
              Letter Spacing
            </label>
            <div className="space-y-2">
              {LETTER_SPACINGS.map((s) => (
                <label key={s.value} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.letterSpacing === s.value ? "border-amber-400 bg-amber-400" : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {form.letterSpacing === s.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" name="letterSpacing" value={s.value} checked={form.letterSpacing === s.value} onChange={() => set("letterSpacing", s.value)} className="sr-only" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Heading weight */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
              Heading Weight
            </label>
            <div className="space-y-2">
              {HEADING_WEIGHTS.map((w) => (
                <label key={w.value} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.headingWeight === w.value ? "border-amber-400 bg-amber-400" : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {form.headingWeight === w.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" name="headingWeight" value={w.value} checked={form.headingWeight === w.value} onChange={() => set("headingWeight", w.value)} className="sr-only" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" style={{ fontWeight: w.value }}>{w.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current settings summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-gray-950 rounded-xl p-5 border border-white/5 flex flex-wrap gap-6"
      >
        {[
          { label: "Body Font", value: form.bodyFont },
          { label: "Display Font", value: form.displayFont },
          { label: "Base Size", value: `${form.baseFontSize}px` },
          { label: "Spacing", value: form.letterSpacing },
          { label: "Heading Weight", value: form.headingWeight },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CmsTypography;
