import { motion } from "framer-motion";

const PageWrapper = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
