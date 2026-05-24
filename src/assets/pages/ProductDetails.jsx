import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import { getSingleProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getSingleProduct(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <PageWrapper>
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-96" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mt-6" />
            </div>
          </div>
        </PageWrapper>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageWrapper>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-10 flex items-center justify-center shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.title} className="h-96 object-contain" />
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};

export default ProductDetails;
