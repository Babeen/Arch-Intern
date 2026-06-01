import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronRight } from "lucide-react";

const ProductSidebar = ({
  search, setSearch,
  categories, selectedCategory, setSelectedCategory,
  priceRange, setPriceRange,
  products,
  mobileOpen, setMobileOpen,
}) => {
  const countFor = (cat) =>
    cat === "all" ? products.length : products.filter((p) => p.category === cat).length;

  const hasActiveFilters = selectedCategory !== "all" || search || priceRange !== 1000;

  const clearAll = () => {
    setSelectedCategory("all");
    setSearch("");
    setPriceRange(1000);
  };

  const content = (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-900 dark:text-white">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-amber-500 transition-colors"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-gray-500">Search</p>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
          />
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-white/5" />

      {/* Category */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-gray-500 mb-3">Category</p>
        <ul className="space-y-0.5">
          {["all", ...categories].map((cat) => {
            const isActive = selectedCategory === cat;
            const count = countFor(cat);
            return (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ChevronRight className={`h-3 w-3 transition-transform ${isActive ? "rotate-90 opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                    <span className="capitalize">{cat === "all" ? "All Products" : cat}</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold tabular-nums ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20"
                      : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500"
                  }`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-px bg-gray-100 dark:bg-white/5" />

      {/* Price range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-gray-500">Max Price</p>
          <span className="text-sm font-bold text-amber-500 tabular-nums">${priceRange}</span>
        </div>

        {/* Track */}
        <div className="relative pt-1">
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-amber-400"
            style={{
              background: `linear-gradient(to right, #f59e0b ${priceRange / 10}%, #e5e7eb ${priceRange / 10}%)`,
            }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-gray-400 font-medium">
          <span>$0</span>
          <span>$1,000</span>
        </div>

        {/* Price buckets */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Under $25", max: 25 },
            { label: "Under $50", max: 50 },
            { label: "Under $100", max: 100 },
            { label: "Under $500", max: 500 },
          ].map((bucket) => (
            <button
              key={bucket.max}
              onClick={() => setPriceRange(bucket.max)}
              className={`text-[11px] font-semibold px-3 py-2 rounded-lg border transition-all duration-200 ${
                priceRange === bucket.max
                  ? "bg-amber-400 text-gray-900 border-amber-400"
                  : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500"
              }`}
            >
              {bucket.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-white/5" />

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-gray-500">Active Filters</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedCategory !== "all" && (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full capitalize">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="hover:text-amber-900 transition-colors">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {priceRange !== 1000 && (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full">
                Max ${priceRange}
                <button onClick={() => setPriceRange(1000)} className="hover:text-amber-900 transition-colors">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full">
                "{search}"
                <button onClick={() => setSearch("")} className="hover:text-amber-900 transition-colors">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-gray-900 dark:text-white text-lg">Filters</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              {content}
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 text-sm"
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
