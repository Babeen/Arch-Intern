// Reusable labeled input/textarea for CMS forms

const CmsField = ({ label, hint, textarea, rows = 3, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">
        {label}
      </label>
    )}
    {textarea ? (
      <textarea
        rows={rows}
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
        {...props}
      />
    ) : (
      <input
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        {...props}
      />
    )}
    {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
  </div>
);

export default CmsField;
