import ProductCard from "./ProductCard";

const ProductGrid = ({ products, viewMode = "grid" }) => (
  <div className={
    viewMode === "list"
      ? "flex flex-col gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
  }>
    {products.map((product, i) => (
      <ProductCard key={product.id} product={product} index={i} viewMode={viewMode} />
    ))}
  </div>
);

export default ProductGrid;
