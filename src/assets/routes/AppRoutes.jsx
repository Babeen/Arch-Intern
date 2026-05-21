import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../components/ui/PageLoader";

const Home = lazy(() => import("../pages/Home"));

const Products = lazy(() =>
  import("../pages/Products")
);

const ProductDetails = lazy(() =>
  import("../pages/ProductDetails")
);

const Cart = lazy(() =>
  import("../pages/Cart")
);

const Login = lazy(() =>
  import("../pages/Login")
);

const Signup = lazy(() =>
  import("../pages/Signup")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />}/>
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;