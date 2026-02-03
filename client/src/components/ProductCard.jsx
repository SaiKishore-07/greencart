import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      //   min-w-56  max-w-56
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          scrollTo(0, 0);
        }}
        className=" mt-5 border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full min-w-70 max-w-90 md:min-w-56 md:max-w-58"
      >
        <div className="mt-2 mb-2 group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-40 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p className="text-[1rem] md:text-sm">{product.category}</p>
          <p className="text-gray-700 font-medium text-2xl md:text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3.5 w-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3 mb-2">
            <p className=" md:text-xl text-xl font-medium text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>
            <div
              className="text-primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex cursor-pointer hover:opacity-80 items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-20 w-20 h-8.5 rounded  "
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart-icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-20 h-8.5 bg-primary/25 rounded select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer hover:opacity-60 text-lg px-2 h-full "
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer hover:opacity-60  text-lg px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
