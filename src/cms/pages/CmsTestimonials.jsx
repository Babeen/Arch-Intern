import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Star, ChevronDown, ChevronUp } from "lucide-react";
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add, edit or remove customer reviews shown on the product details page.</p>
      </motion.div>

      <CmsFormCard
        title={`Reviews (${items.length})`}
        description="Click a review to expand and edit it."
        onSave={handleSave}
        onReset={() => { resetSection("testimonials"); setItems([...content.testimonials]); toast.info("Reset to default."); }}
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                {/* Row header */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                      {item.avatar || item.name.slice(0, 2).toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name || "Unnamed"}</p>
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
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    {expanded === item.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
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
                      <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <CmsField label="Name" placeholder="e.g. Sarah M." value={item.name} onChange={(e) => update(item.id, "name", e.target.value)} />
                          <CmsField label="Role" placeholder="e.g. Verified Buyer" value={item.role} onChange={(e) => update(item.id, "role", e.target.value)} />
                        </div>
                        <CmsField label="Avatar Initials" placeholder="e.g. SM" value={item.avatar} onChange={(e) => update(item.id, "avatar", e.target.value)} hint="2-letter initials shown in the avatar circle." />
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} type="button" onClick={() => update(item.id, "rating", s)}>
                                <Star size={22} className={s <= item.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"} fill="currentColor" />
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
            className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200"
          >
            <Plus className="h-4 w-4" /> Add Review
          </button>
        </div>
      </CmsFormCard>
    </div>
  );
};

export default CmsTestimonials;
