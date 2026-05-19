import Button from "../ui/Button";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden">
      
      {/* Product Image */}
      <div className="h-60 bg-white flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-4">
        
        <h2 className="font-semibold text-lg line-clamp-2">
          {product.title}
        </h2>

        <p className="text-gray-500 text-sm capitalize">
          {product.category}
        </p>

        <div className="flex items-center justify-between">
          
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>

          <Button className="px-4 py-2">
            Add
          </Button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;