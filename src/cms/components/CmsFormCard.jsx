import { motion } from "framer-motion";

const CmsFormCard = ({ title, description, children, onSave, onReset, saving = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
  >
    {/* Card header */}
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
      )}
    </div>

    {/* Form body */}
    <div className="p-6 space-y-5">{children}</div>

    {/* Actions */}
    {(onSave || onReset) && (
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
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
            className="ml-auto flex items-center gap-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        )}
      </div>
    )}
  </motion.div>
);

export default CmsFormCard;
