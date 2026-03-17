import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../redux/slices/RazorpaySlice";
import HomeLayout from "../../layouts/HomeLayout";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const userData = useSelector((state) => state?.auth?.data);

  async function handleSubscription(e) {
    e.preventDefault();

    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded");
      return;
    }

    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }

    setLoading(true);

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "CollabCodex",
      description: "Pro Subscription",
      theme: {
        color: "#F59E0B",
      },
      prefill: {
        email: userData?.email,
        name: userData?.fullName,
      },

      handler: async function (response) {
        const res = await dispatch(verifyUserPayment(response));

        if (res?.payload?.success) {
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },

      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.error("Payment cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-4">

        <form
          onSubmit={handleSubscription}
          className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-gray-700 rounded-2xl shadow-xl p-8 text-center"
        >
          {/* Title */}
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">
            Pro Subscription
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4">
            Unlock all courses with 1-year access. Learn without limits 🚀
          </p>

          {/* Price */}
          <div className="flex items-center justify-center text-3xl font-bold mb-4">
            <FaRupeeSign className="text-yellow-400" />
            <span className="text-orange-400 ml-1">499</span>
          </div>

          {/* Features */}
          <div className="text-gray-400 text-sm space-y-1 mb-6">
            <p>✔ Full course access</p>
            <p>✔ New courses included</p>
            <p>✔ 1 Year validity</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>

          {/* Footer note */}
          <p className="text-xs text-gray-500 mt-4">
            100% refund on cancellation • T&C apply
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Checkout;