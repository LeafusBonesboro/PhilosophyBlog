import { useCart } from "../../context/CartContext";


export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.price * item.qty}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold pt-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
