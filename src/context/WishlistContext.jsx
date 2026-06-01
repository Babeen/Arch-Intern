import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const toast = useToast();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.info(`Removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success(`Added to wishlist`);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from wishlist");
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
