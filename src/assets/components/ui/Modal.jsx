const Modal = ({
  isOpen,
  onClose,
  children,
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          ✕
        </button>

        {children}

      </div>
    </div>
  );
};

export default Modal;