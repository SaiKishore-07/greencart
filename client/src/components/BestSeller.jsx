import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  const bestSellers = products.filter((product) => product.inStock).slice(0, 5);

  return (
    <div className="mt-16">
      <p className="text-4xl md:text-4xl font-medium text-center md:text-left">Best Sellers</p>

      {bestSellers.length === 0 ? (
        <p className="text-primary text-2xl mt-10 text-center">
          No products available 😔
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 place-items-center sm:place-items-stretch
"
        >
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
