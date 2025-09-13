export default function BrowniesPage() {
  const cupcakes = [
    {
      src: "/images/choc-cupcake.jpg",
      title: "Chocolate Fudge Cupcake",
      price: "$3.38",
      old: "$4.50",
    },
    {
      src: "/images/red-velvet.jpg",
      title: "Red Velvet Cupcake",
      price: "$4.75",
    },
    {
      src: "/images/vanilla.jpg",
      title: "Vanilla Bean Cupcake",
      price: "$3.00",
      old: "$4.00",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <p className="text-gray-500 mb-4">
        <span className="cursor-pointer hover:underline">Shop All</span> / Cupcakes
      </p>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Cupcakes</h1>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 hidden md:block">
          <h3 className="font-semibold mb-4">Filters</h3>

          {/* Price */}
          <div className="mb-6">
            <h4 className="font-medium">Price</h4>
            <input type="range" min="0" max="20" className="w-full" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>$20</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-medium mb-2">Collections</h4>
            <ul className="space-y-1 text-gray-700">
              <li><input type="checkbox" /> Gourmet Treats</li>
              <li><input type="checkbox" /> Holiday Collection</li>
              <li><input type="checkbox" /> Seasonal Flavors</li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cupcakes.map((item, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.old && (
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    Sale!
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              {item.old && <p className="line-through text-gray-400">{item.old}</p>}
              <p className="text-orange-600">{item.price}</p>
              <button className="mt-2 text-sm text-blue-600 hover:underline">
                Add to cart
              </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
