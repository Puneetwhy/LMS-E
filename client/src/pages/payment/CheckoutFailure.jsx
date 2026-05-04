import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useLocation } from "react-router-dom";

const CheckoutFailure = () => {
  const { state } = useLocation();

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4">

        <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <RxCrossCircled className="text-red-500 text-7xl animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
            Payment Failed
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
            We couldn’t process your payment at the moment.  
            This may happen due to network issues or payment gateway failure.
            Please try again.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            <Link
              to="/checkout"
              state={state || {}}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg"
            >
              Try Again
            </Link>

            <Link
              to="/"
              className="w-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 py-3 rounded-lg font-semibold border border-gray-600"
            >
              Go to Dashboard
            </Link>

          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-500 mt-5">
            If money is deducted, it will be refunded automatically.
          </p>

        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFailure;