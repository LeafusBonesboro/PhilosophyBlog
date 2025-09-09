// src/components/scenes/Shop/index.jsx
export default function Shop() {
  const products = [
    { id: 1, name: "Brownie", price: 5, image: "/images/brownie.jpg" },
    { id: 2, name: "Crispy Treat", price: 4, image: "/images/crispy.jpg" },
    { id: 3, name: "Cake Slice", price: 6, image: "/images/cake.jpg" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop All Treats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 hover:scale-105 transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">${p.price}</p>
            <a
              href={`/product/${p.id}`}
              className="mt-3 block w-full bg-pink-500 text-white py-2 rounded-xl text-center hover:bg-pink-600"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
