import { createContext, useContext, useState } from "react";

// Default CMS content — mirrors what the storefront actually renders
const defaultContent = {
  hero: {
    badge: "New Arrivals — SS 2025",
    heading: "Define Your",
    headingItalic: "Urban Edge",
    subheading: "Premium streetwear & contemporary fashion — crafted for the modern individual.",
    primaryCta: "Shop Now",
    secondaryCta: "Explore Collections",
    backgroundImage: "",
  },
  promotions: [
    { id: 1, title: "Free Shipping on Orders Over $50", active: true, color: "amber" },
    { id: 2, title: "Summer Sale — Up to 40% Off", active: false, color: "gray" },
  ],
  testimonials: [
    { id: 1, name: "Sarah M.", role: "Verified Buyer", avatar: "SM", rating: 5, body: "Exceeded my expectations. The quality is top-notch and delivery was super fast." },
    { id: 2, name: "James K.", role: "Verified Buyer", avatar: "JK", rating: 4, body: "Really solid product. Looks exactly like the pictures." },
    { id: 3, name: "Priya L.", role: "Verified Buyer", avatar: "PL", rating: 5, body: "I was skeptical at first but this blew me away. Already ordered a second one." },
  ],
  productsShowcase: {
    sectionLabel: "Trending",
    sectionTitle: "Bestsellers",
    maxItems: 4,
  },
  newsletter: {
    badge: "Exclusive Access",
    heading: "Join the Inner Circle",
    subheading: "Subscribe for 15% off your first order, early sale access, and members-only drops.",
    buttonText: "Subscribe",
  },
};

const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("cms_content");
      return stored ? { ...defaultContent, ...JSON.parse(stored) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const updateSection = (section, data) => {
    setContent((prev) => {
      const next = { ...prev, [section]: data };
      localStorage.setItem("cms_content", JSON.stringify(next));
      return next;
    });
  };

  const resetSection = (section) => {
    setContent((prev) => {
      const next = { ...prev, [section]: defaultContent[section] };
      localStorage.setItem("cms_content", JSON.stringify(next));
      return next;
    });
  };

  return (
    <CmsContext.Provider value={{ content, updateSection, resetSection, defaultContent }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => useContext(CmsContext);
