import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getSingleProduct } from "../services/productService";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* Image */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-contain"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          
          <p className="text-blue-600 capitalize font-medium">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {product.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="text-5xl font-bold text-blue-600">
            ${product.price}
          </div>

          <Button
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </Button>

        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;