import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, Package, MessageSquare, Tag, Mail, ArrowRight } from "lucide-react";
import { useCms } from "../context/CmsContext";

const sections = [
  { path: "/cms/hero", label: "Hero Section", icon: Image, desc: "Edit headline, subheading, CTA buttons and background image." },
  { path: "/cms/products", label: "Products Showcase", icon: Package, desc: "Configure the bestsellers section title and item count." },
  { path: "/cms/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Add, edit or remove customer reviews." },
  { path: "/cms/promotions", label: "Promotions", icon: Tag, desc: "Manage the shipping banner and promotional messages." },
  { path: "/cms/newsletter", label: "Newsletter", icon: Mail, desc: "Edit the newsletter section copy and CTA." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};

const CmsDashboard = () => {
  const { content } = useCms();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Manager</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage all storefront content from one place. Changes are saved to localStorage and reflected live.
        </p>
      </motion.div>

      {/* Live preview strip */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="show" custom={1}
        className="bg-gray-950 text-white rounded-lg p-5 flex items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Current Hero Headline</p>
          <p className="text-lg font-bold">
            {content.hero.heading}{" "}
            <span className="italic font-light">{content.hero.headingItalic}</span>
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="shrink-0 flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all duration-300"
        >
          Preview Site <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>

      {/* Section cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ path, label, icon: Icon, desc }, i) => (
          <motion.div key={path} variants={fadeUp} initial="hidden" animate="show" custom={i * 0.5 + 2}>
            <Link
              to={path}
              className="group flex flex-col gap-3 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-amber-400 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-amber-500 mt-auto">
                Edit <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CmsDashboard;
