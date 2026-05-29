import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import heroBg from "../assets/images/home.webp";
import { getProducts } from "../services/ProductService";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const features = [
  { icon: Truck, label: "Free Worldwide Shipping" },
  { icon: ShieldCheck, label: "2-Year Warranty" },
  { icon: RefreshCw, label: "30-Day Easy Returns" },
  { icon: ShoppingBag, label: "Secure Checkout" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <MainLayout transparentNav>
      {/* ── Hero (unchanged) ── */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-white">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            New Arrivals — 2026
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-8xl lg:text-8xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Define Your
            <br />
            <span className="italic font-light">Urban Edge</span>
          </motion.h1>
          <motion.p
            className="mt-5 text-lg sm:text-xl text-white/75 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Premium streetwear & contemporary fashion — crafted for the modern
            individual.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Link
              to="/products"
              className="group flex items-center gap-2 bg-gray-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/collections"
              className="flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-white/40"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>

      {/* ── Features Bar ── */}
      <div className="bg-gray-950 text-white border-b border-white/10 py-5 overflow-hidden">
        <div
          className="flex w-max"
          style={{ animation: "marquee 18s linear infinite" }}
        >
          {[...features, ...features].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 px-10 whitespace-nowrap">
              <Icon className="h-5 w-5 text-amber-400 shrink-0" />
              <span className="text-sm font-medium text-white/80">{label}</span>
              <span className="ml-10 text-white/20 text-lg select-none">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">Collections</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => {
            const sample = products.find((p) => p.category === cat);
            return (
              <motion.div
                key={cat}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.5}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="group relative overflow-hidden rounded-lg aspect-[3/4] block bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
                >
                  {sample ? (
                    <img
                      src={sample.image}
                      alt={cat}
                      className="w-full h-full object-contain p-6 group-hover:scale-110 transition duration-700 ease-out bg-white dark:bg-gray-900"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-bold text-lg leading-tight capitalize">
                      {cat}
                    </h3>
                    <span className="flex items-center gap-1 text-sm text-white/70 mt-1 group-hover:text-amber-300 transition-colors">
                      Shop Now <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Bestsellers (Carousel) ── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex justify-between items-end mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
                Trending
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="relative group">
            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-400 hover:text-gray-900 focus:outline-none disabled:opacity-0"
              aria-label="Scroll left"
              style={{ transform: "translateY(-50%) translateX(-50%)" }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-400 hover:text-gray-900 focus:outline-none"
              aria-label="Scroll right"
              style={{ transform: "translateY(-50%) translateX(50%)" }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 snap-start"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i * 0.05}
                >
                  <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
                    <Link to={`/products/${product.id}`} className="block flex-1">
                      <div className="relative pt-[100%] overflow-hidden bg-gray-50 dark:bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition duration-700"
                        />
                        <span className="absolute top-2 left-2 bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 text-[10px] px-2 py-1 rounded uppercase font-semibold tracking-wide">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1 text-sm">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-gray-800 dark:text-white">
                            ${product.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-gray-950 text-white px-8 md:px-16 py-16 text-center border border-gray-800"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
            Exclusive Access
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Join the Inner Circle</h2>
          <p className="mt-3 text-white/60 max-w-md mx-auto">
            Subscribe for 15% off your first order, early sale access, and
            members-only drops.
          </p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-md px-5 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-400 text-gray-900 font-semibold px-7 py-3 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Home;