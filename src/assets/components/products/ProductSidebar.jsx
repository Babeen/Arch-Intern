import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

const ProductSidebar = ({
  search, setSearch,
  categories, selectedCategory, setSelectedCategory,
  priceRange, setPriceRange,
  products,
  mobileOpen, setMobileOpen,
}) => {
  const countFor = (cat) =>
    cat === "all"
      ? products.length
      : products.filter((p) => p.category === cat).length;

  const hasActiveFilters = selectedCategory !== "all" || search || priceRange !== 1000;

  const clearAll = () => {
    setSelectedCategory("all");
    setSearch("");
    setPriceRange(1000);
  };

  const content = (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-amber-500" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-900 dark:text-white">
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 dark:bg-white/10" />

      {/* Search */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 dark:text-gray-500 mb-3">
          Search
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 dark:bg-white/10" />

      {/* Categories */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 dark:text-gray-500 mb-3">
          Category
        </p>
        <ul className="space-y-1">
          {["all", ...categories].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2.5  text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="capitalize">{cat === "all" ? "All Products" : cat}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-gray-900"
                      : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                  }`}>
                    {countFor(cat)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 dark:bg-white/10" />

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 dark:text-gray-500">
            Max Price
          </p>
          <span className="text-sm font-bold text-amber-500">${priceRange}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-amber-400
            bg-gray-200 dark:bg-white/10"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          {content}
        </div>
      </aside>

      {/* ── Mobile: floating toggle button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-5 py-3 rounded-full shadow-xl hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="bg-amber-400 text-gray-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            !
          </span>
        )}
      </button>

      {/* ── Mobile: drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-gray-900 dark:text-white text-lg">Filters</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              {content}
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
              >
                Show {countFor(selectedCategory)} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductSidebar;
