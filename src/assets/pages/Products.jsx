import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import ProductSidebar from "../components/products/ProductSidebar";
import LoadingSkeleton from "../components/products/LoadingSkeleton";
import SectionHeader from "../components/ui/SectionHeader";
import { getProducts } from "../services/ProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SectionHeader label="Catalogue" title="All Products" subtitle="Browse our latest collection" />
        </motion.div>

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

          {/* Grid */}
          <div className="flex-1 min-w-0">

            {/* Result count + active filter tag */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> results
                {selectedCategory !== "all" && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-400/20 text-amber-700 dark:text-amber-400 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                    {selectedCategory}
                  </span>
                )}
              </p>
            </motion.div>

            {error && <p className="text-red-400 mb-4">{error}</p>}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <p className="text-5xl">🔍</p>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">No products found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
