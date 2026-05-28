import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useCms } from "../context/CmsContext";
import CmsFormCard from "../components/CmsFormCard";
import CmsField from "../components/CmsField";
import { useToast } from "../../context/ToastContext";

const empty = () => ({ id: Date.now(), title: "", active: true, color: "amber" });

const colorOptions = ["amber", "gray", "green", "red", "blue"];

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

  const colorClass = (color) => ({
    amber: "bg-amber-400 text-gray-900",
    gray: "bg-gray-800 text-white",
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white",
  }[color] || "bg-amber-400 text-gray-900");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promotions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage the shipping banner and promotional messages shown at the top of the site.</p>
      </motion.div>

      <CmsFormCard
        title={`Banners (${items.length})`}
        description="Only active banners are shown. The first active banner is displayed."
        onSave={handleSave}
        onReset={() => { resetSection("promotions"); setItems([...content.promotions]); toast.info("Reset to default."); }}
        saving={saving}
      >
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <CmsField
                    placeholder="e.g. Free Shipping on Orders Over $50"
                    value={item.title}
                    onChange={(e) => update(item.id, "title", e.target.value)}
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => update(item.id, "active", !item.active)}
                      className={`transition-colors ${item.active ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                      title={item.active ? "Active — click to deactivate" : "Inactive — click to activate"}
                    >
                      {item.active
                        ? <ToggleRight className="h-6 w-6" />
                        : <ToggleLeft className="h-6 w-6" />}
                    </button>
                    <button type="button" onClick={() => remove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Color picker */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Color:</span>
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update(item.id, "color", c)}
                      className={`w-5 h-5 rounded-full transition-all ${colorClass(c)} ${item.color === c ? "ring-2 ring-offset-2 ring-amber-400" : ""}`}
                    />
                  ))}
                </div>

                {/* Preview */}
                <div className={`rounded px-3 py-2 text-xs font-semibold text-center ${colorClass(item.color)} ${!item.active ? "opacity-40" : ""}`}>
                  {item.title || "Banner preview"}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={add}
            className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200"
          >
            <Plus className="h-4 w-4" /> Add Banner
          </button>
        </div>
      </CmsFormCard>
    </div>
  );
};

export default CmsPromotions;
