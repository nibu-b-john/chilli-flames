import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const onSubmit = async (data) => {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyLBxQRIzSz5eUz2MVgxJVe_pgDdsQMoEzV-c6NekrUNMfOee7sd9Hmynai8xISgn_62w/exec";
    try {
      console.log(data);
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Optionally reset the form here
      } else {
        console.error("Form submission failed:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="min-h-screen w-screen bg-[#FFF0D8]">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src="/images/home/background.png"
          alt="Restaurant Background"
        />
        {/* Logo */}
        <img
          className="w-auto h-16 sm:h-20 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/images/logo.png"
          alt="Restaurant Logo"
        />

        {/* Back Button and Heading */}
        <div
          className="hidden font-semibold absolute top-10 left-10 md:flex items-center space-x-2 hover:cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft className="text-white" />
          <p className="text-lg sm:text-xl text-white">Back</p>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="relative w-full flex items-start">
            <h2 className="ml-auto mr-auto text-xl sm:text-2xl md:text-3xl uppercase font-semibold">
              Place Order
            </h2>
          </div>
        </div>
      </div>
      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-5 rounded-lg"
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            placeholder="Type your name"
            {...register("Name", { required: true })}
            className="bg-transparent w-full py-3 border-b-[1.5px] border-black  text- focus:ring-2 focus:ring-transparent focus:outline-none"
          />
          {errors.Name && (
            <span className="text-red-500 text-sm mt-1 block">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <input
            placeholder="Type your address"
            {...register("Address", { required: true })}
            className="bg-transparent w-full py-3 border-b-[1.5px] border-black  text- focus:ring-2 focus:ring-transparent focus:outline-none"
          />
          {errors.Address && (
            <span className="text-red-500 text-sm mt-1 block">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">EIR Code</label>
          <input
            placeholder="Type your EIR code"
            {...register("EIRCode", { required: true })}
            className="bg-transparent w-full py-3 border-b-[1.5px] border-black  text- focus:ring-2 focus:ring-transparent focus:outline-none"
          />
          {errors.EIRCode && (
            <span className="text-red-500 text-sm mt-1 block">
              This field is required
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black/80 text-white py-3 rounded-md text-lg font-medium hover:bg-black transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkout;
