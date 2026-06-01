import { createContext, useContext, useState, useEffect } from "react";

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
  typography: {
    bodyFont: "Outfit",
    displayFont: "Cormorant Garamond",
    baseFontSize: "16",
    headingWeight: "700",
    bodyWeight: "400",
    letterSpacing: "normal",
  },
};

const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("cms_content");
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultContent, ...parsed, typography: { ...defaultContent.typography, ...(parsed.typography || {}) } };
      }
      return defaultContent;
    } catch {
      return defaultContent;
    }
  });

  // Apply typography to the document root whenever it changes
  useEffect(() => {
    const { bodyFont, displayFont, baseFontSize, letterSpacing } = content.typography;
    const root = document.documentElement;
    root.style.setProperty("--font-body", `'${bodyFont}', sans-serif`);
    root.style.setProperty("--font-display", `'${displayFont}', serif`);
    root.style.setProperty("--font-size-base", `${baseFontSize}px`);
    root.style.setProperty("--letter-spacing-body", letterSpacing === "wide" ? "0.04em" : letterSpacing === "tight" ? "-0.01em" : "0.01em");
    document.body.style.fontFamily = `'${bodyFont}', -apple-system, BlinkMacSystemFont, sans-serif`;
    // Apply display font to headings via a style tag
    let styleTag = document.getElementById("cms-font-override");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "cms-font-override";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
      body { font-family: '${bodyFont}', -apple-system, BlinkMacSystemFont, sans-serif; font-size: ${baseFontSize}px; letter-spacing: ${letterSpacing === "wide" ? "0.04em" : letterSpacing === "tight" ? "-0.01em" : "0.01em"}; }
      h1, h2, h3, h4, h5, h6 { font-family: '${displayFont}', Georgia, serif; }
    `;
  }, [content.typography]);

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
