const FormField = ({ error, ...props }) => (
  <div>
    <input
      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
  </div>
);

export default FormField;
