import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Arch Intern Home Page
        </h1>

        <Button dark:bg-grey-900 dark:text-white to="/products">
          Explore Products
        </Button>
      </div>
    </MainLayout>
  );
};

export default Home;