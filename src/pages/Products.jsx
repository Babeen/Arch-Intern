import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import ProductSidebar from "../components/products/ProductSidebar";
import LoadingSkeleton from "../components/products/LoadingSkeleton";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { getProducts } from "../services/ProductService";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "rating-desc", label: "Top Rated" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategory(cat || "all");
  }, [searchParams]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.title.localeCompare(b.title);
    if (sortBy === "rating-desc") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    return 0;
  });

  const categoryLabel = selectedCategory === "all"
    ? "All Products"
    : selectedCategory.replace(/\b\w/g, (c) => c.toUpperCase());

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Featured";

  return (
    <MainLayout>
      {/* ── Editorial page header ── */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <motion.div
            className="mt-6"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-2">
              {selectedCategory === "all" ? "Catalogue" : selectedCategory}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-none">
              {categoryLabel}
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-base max-w-xl">
              {selectedCategory === "all"
                ? "Explore our full collection of premium products, curated for the modern individual."
                : `Discover our ${categoryLabel.toLowerCase()} collection — quality crafted for every occasion.`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <ProductSidebar
            search={search} setSearch={setSearch}
            categories={categories}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            priceRange={priceRange} setPriceRange={setPriceRange}
            products={products}
            mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <motion.div
              className="flex items-center justify-between mb-8 gap-4 flex-wrap"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
            >
              {/* Result count + active filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white text-base">{sorted.length}</span>
                  <span className="ml-1.5">products</span>
                </p>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-400/15 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full capitalize border border-amber-200 dark:border-amber-400/20">
                    {selectedCategory}
                  </span>
                )}
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    <span>{activeSortLabel}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sortBy === opt.value
                                ? "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 font-semibold"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1 gap-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
                    title="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </motion.div>

            {/* Content */}
            {error && (
              <p className="text-red-400 mb-6 text-sm">{error}</p>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
              </div>
            ) : sorted.length === 0 ? (
              <motion.div
                className="text-center py-32 space-y-4"
                variants={fadeUp}
                initial="hidden"
                animate="show"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">No products found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
              </motion.div>
            ) : (
              <ProductGrid products={sorted} viewMode={viewMode} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
