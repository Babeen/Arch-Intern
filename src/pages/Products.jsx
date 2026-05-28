import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import ProductSidebar from "../components/products/ProductSidebar";
import LoadingSkeleton from "../components/products/LoadingSkeleton";
import SectionHeader from "../components/ui/SectionHeader";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { getProducts } from "../services/ProductService";

// Matches the fadeUp variant used on Home
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
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

  // Sync selectedCategory with the ?category= query param whenever the URL changes
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

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumbs />

        {/* Header — whileInView matches Home section headers */}
        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Catalogue"
            title={selectedCategory === "all" ? "All Products" : selectedCategory.replace(/\b\w/g, (c) => c.toUpperCase())}
            subtitle="Browse our latest collection"
          />
        </motion.div>

        <div className="flex gap-8 items-start">
          <ProductSidebar
            search={search} setSearch={setSearch}
            categories={categories}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            priceRange={priceRange} setPriceRange={setPriceRange}
            products={products}
            mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
          />

          <div className="flex-1 min-w-0">
            {/* Result count — y + opacity matches Home's animation style */}
            <motion.div
              className="flex items-center justify-between mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.1}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredProducts.length}
                </span>{" "}
                results
                {selectedCategory !== "all" && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-400/20 text-amber-700 dark:text-amber-400 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                    {selectedCategory}
                  </span>
                )}
              </p>
            </motion.div>

            {error && (
              <motion.p
                className="text-red-400 mb-4"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                {error}
              </motion.p>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              // Empty state — animated in like Home sections
              <motion.div
                className="text-center py-24 space-y-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="text-5xl">🔍</p>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">No products found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search term</p>
              </motion.div>
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
