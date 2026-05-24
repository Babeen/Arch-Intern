const ProductFilters = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="flex flex-wrap gap-2">
    {["all", ...categories].map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
          selectedCategory === cat
            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-400 hover:text-gray-900"
        }`}
      >
        {cat === "all" ? "All" : cat}
      </button>
    ))}
  </div>
);

export default ProductFilters;
