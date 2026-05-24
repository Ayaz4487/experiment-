

const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Cinematic Image container */}
      <div className="h-48 w-full relative overflow-hidden bg-gray-900">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-black text-yellow-500">₹{product.price}</span>

          {quantity > 0 ? (
            <div className="flex items-center bg-gray-700 rounded-full overflow-hidden border border-gray-600">
              <button
                onClick={() => onRemove(product)}
                className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-600 transition-colors focus:outline-none font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-white font-medium text-sm">
                {quantity}
              </span>
              <button
                onClick={() => onAdd(product)}
                className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-600 transition-colors focus:outline-none font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(product)}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-5 rounded-full text-sm transition-colors shadow-md focus:outline-none"
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
