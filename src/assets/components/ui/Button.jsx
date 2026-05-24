const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 rounded-r-2xl transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;