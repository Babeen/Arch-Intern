const SectionHeader = ({ label, title, subtitle, center = false }) => (
  <div className={center ? "text-center" : ""}>
    {label && (
      <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
        {label}
      </p>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">{title}</h2>
    {subtitle && (
      <p className="mt-2 text-gray-500 dark:text-gray-400">{subtitle}</p>
    )}
  </div>
);

export default SectionHeader;
