import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 py-6 border-t border-gray-100 dark:border-white/10" : "max-h-0"
      }`}
    >
      <NavLinks mobile={true} onClick={() => setIsOpen(false)} />
    </div>
  );
};

export default MobileMenu;