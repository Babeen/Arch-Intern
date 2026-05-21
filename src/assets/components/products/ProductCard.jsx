import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ duration: 0 }}
      whileHover={{ y: 0, scale: 1.02 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden">      
      {/* Image + Title wrapped in Link */}
      <Link to={`/products/${product.id}`} className="block cursor-pointer">
        {/* Product Image */}
        <div className="h-60 bg-white flex items-center justify-center  dark:bg-gray-900 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        {/* Product Title */}
        <h2 className="font-semibold text-lg line-clamp-2  text-gray-800 dark:text-white px-5 pt-2 ">
          {product.title}
        </h2>
      </Link>

      {/* Rest of the product info (category, price, button) */}
      <div className="p-5 space-y-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <Button className="px-4 py-2" onClick={() => addToCart(product)}
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;