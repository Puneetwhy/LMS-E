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
  const [isReady, setIsReady] = useState(false);

  const razorpayState = useSelector((state) => state.razorpay) || {};
  const authState = useSelector((state) => state.auth) || {};

  const razorpayKey = razorpayState.key;
  const subscription_id = razorpayState.subscription_id;
  const userData = authState.data;

  // Load Razorpay Key + Create Subscription
  useEffect(() => {
    const initializePayment = async () => {
      try {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());   // ← Important: Subscription create karna zaroori hai
        setIsReady(true);
      } catch (error) {
        toast.error("Failed to initialize payment. Please try again.");
        console.error(error);
      }
    };

    initializePayment();
  }, [dispatch]);

  const handleSubscription = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh.");
      return;
    }
    if (!razorpayKey || !subscription_id) {
      toast.error("Payment not ready yet. Please wait a moment.");
      return;
    }

    setLoading(true);

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "CollabCodex",
      description: "Pro Subscription - 1 Year Access",
      theme: { color: "#F59E0B" },
      prefill: {
        name: userData?.fullName || userData?.name || "",
        email: userData?.email || "",
        contact: userData?.phoneNumber || "",
      },
      handler: async function (response) {
        try {
          const res = await dispatch(verifyUserPayment(response));
          if (res?.payload?.success) {
            toast.success("Payment Successful! 🎉");
            navigate("/checkout/success");
          } else {
            navigate("/checkout/fail");
          }
        } catch (error) {
          console.error(error);
          navigate("/checkout/fail");
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.error("Payment Cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-4">
        <form
          onSubmit={handleSubscription}
          className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-gray-700 rounded-2xl shadow-xl p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Pro Subscription</h1>
          <p className="text-gray-400 mb-6">Unlock unlimited access to all courses for 1 year</p>

          <div className="flex items-center justify-center text-5xl font-bold mb-6">
            <FaRupeeSign className="text-yellow-400" />
            <span className="text-orange-400">499</span>
          </div>

          <div className="text-left text-gray-300 space-y-2 mb-8">
            <p>✔ Full access to all courses</p>
            <p>✔ New courses added automatically</p>
            <p>✔ 1 Year validity</p>
            <p>✔ Cancel anytime</p>
          </div>

          <button
            type="submit"
            disabled={loading || !isReady || !subscription_id}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing Payment..." : "Pay ₹499 Now"}
          </button>

          <p className="text-xs text-gray-500 mt-6">
            Secure payment by Razorpay • 100% Safe
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Checkout;