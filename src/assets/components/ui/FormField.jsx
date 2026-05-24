const FormField = ({ error, ...props }) => (
  <div>
    <input
      className="w-full bg-white/5 border border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
      {...props}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default FormField;
