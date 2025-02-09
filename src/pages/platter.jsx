import React, { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlatterCard from "../components/platter/card";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartItems,
  selectSubtotal,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";

const Platter = () => {
  const navigate = useNavigate();
  const { platterType } = useParams();
  const [platterData, setPlatterData] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyLBxQRIzSz5eUz2MVgxJVe_pgDdsQMoEzV-c6NekrUNMfOee7sd9Hmynai8xISgn_62w/exec";

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setPlatterData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [platterType]);

  const CheckoutModal = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          body: new URLSearchParams(data),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        });

        if (response.ok) {
          alert("Order placed successfully!");
          dispatch(clearCart());
          setShowCheckoutModal(false);
        } else {
          alert("Order submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-dark/50 z-50 flex items-center justify-center p-4">
        {isSubmitting && (
          <div className="fixed inset-0 bg-dark/70 z-[60] flex flex-col items-center justify-center">
            <Watch
              visible={true}
              height="80"
              width="80"
              radius="48"
              color="#000"
              ariaLabel="watch-loading"
            />
            <p className="text-dark mt-4 text-lg">Processing Your Order...</p>
          </div>
        )}

        <div className="bg-secondary rounded-lg w-full max-w-md p-6 relative">
          <button
            onClick={() => setShowCheckoutModal(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">Place Order</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                placeholder="Type your name"
                {...register("Name", { required: true })}
                className="w-full p-2 border rounded bg-transparent"
                disabled={isSubmitting}
              />
              {errors.Name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                placeholder="Type your address"
                {...register("Address", { required: true })}
                className="w-full p-2 border rounded bg-transparent"
                disabled={isSubmitting}
              />
              {errors.Address && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">EIR Code</label>
              <input
                placeholder="Type your EIR code"
                {...register("EIRCode", { required: true })}
                className="w-full p-2 border rounded bg-transparent"
                disabled={isSubmitting}
              />
              {errors.EIRCode && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-dark text-light py-3 rounded-lg text-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  if (!platterData)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#000"
          ariaLabel="watch-loading"
        />
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      {/* Mobile Cart Toggle */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-primary p-4 rounded-full shadow-lg relative transition-transform hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-light rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full ">
          <img
            className="w-full h-full object-cover "
            src={platterData.metadata.platterBackground}
            alt="Restaurant Background"
          />
          <div className="absolute inset-0 bg-overlay"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-8 pb-24 px-4">
          {/* Back Button */}
          <div
            className="hidden md:flex items-center space-x-2 self-start mb-8 hover:cursor-pointer"
            onClick={handleGoBack}
          >
            <ArrowLeft className="text-light" />
            <p className="text-lg sm:text-xl text-light">Back</p>
          </div>

          {/* Logo */}
          <img
            className="w-auto h-12 sm:h-20 mb-8"
            src={platterData.metadata.logo}
            alt="Restaurant Logo"
          />

          {/* Heading & Description */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl uppercase font-semibold text-light">
              {platterData[platterType].heading}
            </h2>
            <p className="mt-2 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-light">
              {platterData[platterType].description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary min-h-screen flex flex-col items-center px-4 sm:px-6 xl:px-32 py-6 gap-3">
        <h3 className="text-xl md:text-2xl lg:text-3xl uppercase font-semibold tracking-widest">
          Regular Menu
        </h3>

        <div className="w-full max-w-3xl space-y-4 pt-6">
          <div className="w-full flex flex-col sm:flex-row justify-center gap-3">
            {platterData.home.platterCategories.map((category) => {
              const isActive = location.pathname === category.route;
              return (
                <Link
                  key={category.name}
                  to={category.route}
                  className={`px-3 sm:px-4 py-2 border-2 text-center border-dark uppercase font-semibold text-sm sm:text-base transition-colors ${
                    isActive
                      ? "bg-dark text-light"
                      : "hover:bg-dark hover:text-light"
                  }`}
                >
                  {category.name} Platter
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Dishes Column */}
            <div
              className={`lg:col-span-8 ${
                isCartOpen ? "hidden md:block" : "block"
              }`}
            >
              {platterData[platterType].dishTypes?.map((dishType, index) => (
                <section key={index} className="mb-12">
                  <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">
                    {dishType.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    {dishType.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dishType.dishes.map((dish) => (
                      <PlatterCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Cart Sidebar */}
            <div
              className={`lg:col-span-4 ${
                isCartOpen ? "block" : "hidden md:block"
              }`}
            >
              <div className="sticky top-4 bg-accent p-4 sm:p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg sm:text-xl font-bold">Your Order</h4>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 mb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-base sm:text-lg">
                            {item.name}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm sm:text-lg">
                              x{item.quantity}
                            </span>
                            <span className="font-bold text-sm sm:text-base">
                              £{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-8 pt-4 border-t border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-sm sm:text-base">
                          Subtotal:
                        </span>
                        <span className="font-bold text-lg sm:text-xl">
                          £{subtotal.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        *Taxes included
                      </p>

                      <button
                        className="w-full bg-dark text-light py-3 rounded-lg mt-4"
                        onClick={() => setShowCheckoutModal(true)}
                      >
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckoutModal && <CheckoutModal />}
    </div>
  );
};

export default Platter;
