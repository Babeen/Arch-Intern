const ProductFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      
      <button
        onClick={() => setSelectedCategory("all")}
        className={`px-4 py-2 rounded-lg ${
          selectedCategory === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-lg capitalize ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;