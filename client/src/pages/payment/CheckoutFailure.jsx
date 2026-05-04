import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";

const CheckoutFailure = () => {
  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4">

        <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">

          <div className="flex justify-center mb-4">
            <RxCrossCircled className="text-red-500 text-6xl animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
            Payment Failed ❌
          </h1>

          <p className="text-gray-300 text-sm sm:text-base mb-6">
            Something went wrong while processing your payment.  
            Please try again.
          </p>

          <Link
            to="/checkout"
            className="block w-full bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg"
          >
            Try Again
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFailure;