import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/CartContext";

const Cart = () => {
  
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        
        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between"
                >
                  
                  {/* Left */}
                  <div className="flex items-center gap-6">
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain"
                    />

                    <div>
                      <h2 className="font-semibold">
                        {item.title}
                      </h2>

                      <p className="text-blue-600 font-bold mt-2">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white p-6 rounded-xl">
              
              <h2 className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </h2>

            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;