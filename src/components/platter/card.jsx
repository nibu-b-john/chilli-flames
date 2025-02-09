import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";

const PlatterCard = ({ dish }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) =>
      state.cart.items.find((item) => item.id === dish.id)?.quantity || 0
  );

  const handleIncrement = () => {
    dispatch(
      updateQuantity({
        id: dish.id,
        newQuantity: quantity + 1,
        dish: dish,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      updateQuantity({
        id: dish.id,
        newQuantity: Math.max(0, quantity - 1),
      })
    );
  };

  return (
    <div className="bg-accent px-4 py-3 rounded-lg flex flex-col w-full gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <img
          className="w-full sm:w-28 h-32 object-cover rounded-lg"
          src={dish.image}
          alt={dish.name}
        />
        <div className="flex-1">
          <p className="font-bold text-lg sm:text-xl">{dish.name}</p>
          <p className="text-xs sm:text-sm whitespace-pre-wrap">
            {dish.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4">
        <p className="font-semibold text-2xl sm:text-4xl">
          £{dish.price.toFixed(2)}
        </p>
        <div className="w-full sm:w-40 h-14 bg-primary p-2 rounded-lg">
          <div className="flex justify-between items-center w-full gap-2">
            <div
              onClick={handleDecrement}
              className={`bg-accent rounded-full w-10 h-10  flex items-center justify-center hover:cursor-pointer ${
                quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">{quantity}</span>
            <div
              onClick={handleIncrement}
              className="bg-dark text-light rounded-full w-10 h-10  flex items-center justify-center font-semibold hover:cursor-pointer"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatterCard;
