import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../components/ui/PageLoader";
import ScrollToTop from "../components/ui/ScrollToTop";

// Storefront pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist"));

// CMS
const CmsLayout = lazy(() => import("../cms/layouts/CmsLayout"));
const CmsDashboard = lazy(() => import("../cms/pages/CmsDashboard"));
const CmsHero = lazy(() => import("../cms/pages/CmsHero"));
const CmsProducts = lazy(() => import("../cms/pages/CmsProducts"));
const CmsTestimonials = lazy(() => import("../cms/pages/CmsTestimonials"));
const CmsPromotions = lazy(() => import("../cms/pages/CmsPromotions"));
const CmsNewsletter = lazy(() => import("../cms/pages/CmsNewsletter"));
const CmsTypography = lazy(() => import("../cms/pages/CmsTypography"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* CMS — protected behind login */}
        <Route path="/cms" element={<ProtectedRoute><CmsLayout /></ProtectedRoute>}>
          <Route index element={<CmsDashboard />} />
          <Route path="hero" element={<CmsHero />} />
          <Route path="products" element={<CmsProducts />} />
          <Route path="testimonials" element={<CmsTestimonials />} />
          <Route path="promotions" element={<CmsPromotions />} />
          <Route path="newsletter" element={<CmsNewsletter />} />
          <Route path="typography" element={<CmsTypography />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
