import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import ProductFilters from "../components/products/ProductFilters";
import LoadingSkeleton from "../components/products/LoadingSkeleton";
import { getProducts } from "../services/ProductService";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories
  const categories = [
    ...new Set(products.map((item) => item.category)),
  ];

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8">
        
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Browse our latest products
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Products;