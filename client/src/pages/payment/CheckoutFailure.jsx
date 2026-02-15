import { RxCrossCircled } from "react-icons/rx"
import HomeLayout from "../../layouts/HomeLayout"
import { Link } from "react-router-dom"

const CheckoutFailure = () => {
  return (
    <HomeLayout>
        <div className="min-h-screen flex items-center justify-center text-white px-4">
            <div className="w-full max-w-md min-h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative bg-gray-900 p-6">
              <h1 className="bg-red-600 absolute top-0 py-4 text-center text-xl sm:text-2xl font-bold rounded-t-lg w-full">
                Payment Failed!
              </h1>

              <div className="px-4 flex flex-col items-center justify-center space-y-2">
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold ">
                    Oops! your payment failed
                  </h2>

                  <p className="text-center text-sm sm:text-base">
                      Your payment failed please try again later
                  </p>
                </div>

                <RxCrossCircled className="text-center text-5xl text-red-500"/>
              </div>
              <Link to="/checkout" className="mt-6 bg-red-500 hover:bg-red-600 transition-all duration-300 py-2 px-6 rounded-lg font-semibold w-full text-center">
                <button>
                  Try again
                </button>
              </Link>
            </div>

        </div>
    </HomeLayout>
  )
}

export default CheckoutFailure
