import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 py-6" : "max-h-0"
      }`}
    >
      <NavLinks mobile={true} onClick={() => setIsOpen(false)} />
    </div>
  );
};

export default MobileMenu;