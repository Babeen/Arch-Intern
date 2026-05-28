import { motion } from "framer-motion";

const CmsFormCard = ({ title, description, children, onSave, onReset, saving = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
  >
    {/* Card header */}
    <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
      )}
    </div>

    {/* Form body */}
    <div className="p-6 space-y-5">{children}</div>

    {/* Actions */}
    {(onSave || onReset) && (
      <div className="px-6 py-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-3 bg-gray-50/50 dark:bg-white/[0.02]">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Reset to default
          </button>
        )}
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="ml-auto flex items-center gap-2 px-5 py-2 bg-amber-400 text-gray-900 text-xs font-semibold rounded-lg hover:bg-amber-300 transition-all duration-200 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        )}
      </div>
    )}
  </motion.div>
);

export default CmsFormCard;
