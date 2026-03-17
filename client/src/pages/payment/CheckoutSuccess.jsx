import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../redux/slices/authSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4">

        <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <AiFillCheckCircle className="text-green-400 text-6xl animate-bounce" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
            Payment Successful 🎉
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base mb-6">
            Welcome to the <span className="text-white font-semibold">Pro Bundle</span>.  
            You now have full access to all courses.
          </p>

          {/* Button */}
          <Link
            to="/"
            className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutSuccess;