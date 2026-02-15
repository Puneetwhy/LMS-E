import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../redux/slices/RazorpaySlice";
import HomeLayout from "../../layouts/HomeLayout";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa"

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVerified  = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const userData = useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            console.log("KEY:", razorpayKey);
            console.log("SUBSCRIPTION:", subscription_id);
            console.log("USER:", userData);

            toast.error("Something went wrong");
            return;
        }        

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify pvt. Ltd",
            description: "Subscription",
            theme : {
                color: "#F37254"
            },
            prefill: {
                email: userData.email,
                name : userData.fullName
            },

            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                const res = await dispatch(verifyUserPayment(paymentDetails));

                if (res?.payload?.success) {
                    navigate("/checkout/success");
                } else {
                    navigate("/checkout/fail");
                }
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

  return (
    <HomeLayout>
        <form 
            onSubmit={handleSubscription}
            className="flex min-h-screen items-center justify-center text-white px-4">

                <div className="flex flex-col w-full max-w-md shadow-[0_0_10px_black] items-center justify-center min-h-[26rem] rounded-lg relative p-6"
>

                    <h1 className="bg-yellow-500 text-center rounded-t-lg text-lg sm:text-xl font-semibold absolute top-0 w-full py-4">Subscription Bundle</h1>

                    <div className="flex space-y-4 flex-col items-center text-center">
                        <p className="text-sm sm:text-base">
                            This purchase will allow you to access all available courses
                            of our plateform {" "}
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 Year duration {" "}
                            </span>
                            All the existing and new launch courses will be also available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-bold">
                            <FaRupeeSign className="text-yellow-500"/><span className="text-orange-500">499</span>only
                        </p>

                        <div className="text-gray-400">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied</p>
                        </div>

                        <button type="submit" className="mt-6 w-full sm:w-2/3 font-bold text-lg sm:text-xl py-2 bg-yellow-600 hover:bg-yellow-500 hover:text-cyan-700 transition-all duration-300 rounded-lg">
                            Buy now
                        </button>
                    </div>
                </div>

        </form>
    </HomeLayout>
  )
} 

export default Checkout
