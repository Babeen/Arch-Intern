import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product, i) => (
      <ProductCard key={product.id} product={product} index={i} />
    ))}
  </div>
);

export default ProductGrid;
