import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, Award, Heart, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutImage1 from "../assets/images/about1.webp";
import brandStoryImage from "../assets/images/brandstory.webp";

// ✅ Import team images (replace with your actual file names)
import sarahChenImg from "../assets/images/sarah.webp";
import marcusRiveraImg from "../assets/images/marcus.webp";
import samJamImg from "../assets/images/sam.webp";
import jamesOkaforImg from "../assets/images/james.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stats = [
  { value: "10M+", label: "Customers Worldwide" },
  { value: "120+", label: "Countries Served" },
  { value: "50+", label: "Years of Heritage" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Craft",
    description: "Every product we create starts with a deep love for design and an obsession with quality. We don't cut corners — we refine them.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Inspired by cultures, cities, and communities across the world. Our designs speak a universal language of style.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We push boundaries with materials, technology, and design thinking to create products that are ahead of their time.",
  },
  {
    icon: Shield,
    title: "Sustainability",
    description: "Committed to a better planet. We use responsibly sourced materials and work toward carbon-neutral operations by 2030.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our community shapes who we are. Athletes, artists, and everyday people inspire every collection we release.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "From raw material to finished product, every step is held to the highest standard. Quality isn't a feature — it's our foundation.",
  },
];

// ✅ Team array now uses imported image variables
const team = [
  { name: "Sarah Chen", role: "Chief Executive Officer", image: sarahChenImg },
  { name: "Marcus Rivera", role: "Head of Design", image: marcusRiveraImg },
  { name: "Sam Jam", role: "Chief Sustainability Officer", image: samJamImg },
  { name: "James Okafor", role: "VP of Product", image: jamesOkaforImg },
];

const AboutUs = () => {
  return (
    <MainLayout transparentNav>
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${AboutImage1})` }} />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="text-6xl sm:text-8xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Built for the
            <br />
            <span className="italic font-light text-amber-400">Bold & Fearless</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-white/70 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            We don't just make products. We create tools for self-expression, performance, and identity.
          </motion.p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-amber-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-3">Since 1972</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              A Legacy of
              <br />
              <span className="italic font-light">Authentic Style</span>
            </h2>
            <div className="mt-8 space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
              <p>
                What started as a small workshop with a single vision — to create products that move with the human
                body — has grown into one of the world's most recognized brands. Our founders believed that great design
                should never compromise performance.
              </p>
              <p>
                Over five decades, we've stayed true to that belief. Every stitch, every sole, every seam is a
                testament to our relentless pursuit of excellence. We've dressed athletes on world stages and
                individuals on city streets — and we treat both with equal respect.
              </p>
              <p>
                Today, we operate in over 120 countries, but our spirit remains the same: bold, authentic, and always
                moving forward.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-10 inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 group"
            >
              Explore Our Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
          >
            <div className="aspect-[4/5] rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 relative">
              <img src={brandStoryImage} alt="Brand story visual" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-400 rounded-lg -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-3">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400 transition-colors duration-300">
                  <value.icon className="h-6 w-6 text-amber-500 group-hover:text-gray-900 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team with Images ── */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-3">The People Behind the Brand</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Meet Our Leadership</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="text-center group"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.1}
            >
              <div className="relative mx-auto w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 group-hover:border-amber-400 transition-colors duration-300 overflow-hidden flex items-center justify-center mb-5">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;