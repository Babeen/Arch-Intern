import MainLayout from "../layouts/MainLayout";

const Products = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Products Page
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
         <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            Product Card
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            Product Card
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            Product Card
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Products;