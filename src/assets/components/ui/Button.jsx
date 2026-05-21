const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-blue-600 text-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-700  transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;