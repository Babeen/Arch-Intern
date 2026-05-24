import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import ProductFilters from "../components/products/ProductFilters";
import LoadingSkeleton from "../components/products/LoadingSkeleton";
import SectionHeader from "../components/ui/SectionHeader";
import PageWrapper from "../components/ui/PageWrapper";
import { getProducts } from "../services/ProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <PageWrapper className="space-y-10">
        <SectionHeader label="Catalogue" title="All Products" subtitle="Browse our latest collection" />

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <SearchBar search={search} setSearch={setSearch} />
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </PageWrapper>
    </MainLayout>
  );
};

export default Products;
