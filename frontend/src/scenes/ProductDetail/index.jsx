import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Example product (later replace with real data fetch)
  const product = {
    id: parseInt(id),
    name: "Brownie",
    price: 5,
    description: "Delicious chocolate brownie made with premium ingredients.",
    image: "/images/brownie.jpg",
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>

          <button
            onClick={() => addToCart(product, 1)}
            className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
