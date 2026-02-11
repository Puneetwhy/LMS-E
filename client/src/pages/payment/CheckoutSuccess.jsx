import { AiFillCheckCircle } from "react-icons/ai"
import HomeLayout from "../../layouts/HomeLayout"
import { Link } from "react-router-dom"

const CheckoutSuccess = () => {
  return (
    <HomeLayout>
        <div className="min-h-[100vh] flex items-center justify-center text-white">
            <div className="w-1/3 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
              <h1 className="bg-green-600 absolute top-0 py-4 text-center text-2xl font-bold rounded-t-lg w-full">
                Payment Successfull!
              </h1>

              <div className="px-4 flex flex-col items-center justify-center space-y-2">
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold ">
                    Welcome to the pro bundle
                  </h2>

                  <p className="text-left">
                      Now you can enjoy all the courses.
                  </p>
                </div>

                <AiFillCheckCircle className="text-center text-5xl text-green-500"/>
              </div>
              <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 py-2 px-3 rounded-lg absolute bottom-5 font-semibold">
                <button>
                  Go to dashboard
                </button>
              </Link>
            </div>

        </div>
    </HomeLayout>
  )
}

export default CheckoutSuccess
