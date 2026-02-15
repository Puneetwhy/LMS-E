import { Navigate, useLocation } from "react-router-dom"
import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {

    const {state} = useLocation();
    const navigate = new Navigate();

    return (
        <HomeLayout >
            <div className="min-h-[90vh] py-8 sm:py-12 px-4 sm:px-10 md:px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-6 md:py-10 relative w-full max-w-[1200px]">
                    <div className="space-y-5">
                        <img 
                        className="w-full h-52 sm:h-64 object-cover rounded-md"
                        src={state?.thumbnail?.secure_url} 
                        alt="thumbnail" />

                        <div className="space-y-4">
                            <div className="flex items-center flex-col justify-center text-lg sm:text-xl text-center">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "} 
                                    </span>
                                    {state?.numberoflectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "} 
                                    </span>
                                    {state?.numberoflectures}
                                </p>
                            </div>

                            {
                             role === "ADMIN" || data?.subscription?.status === "active"? (
                                <button onClick={() => navigate('/course/displaylectures', {state: {...state}})} className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 sm:px-5 py-2 sm:py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                >
                                    Watch lectures
                                </button>
                                ) : (
                                    <button onClick={() => Navigate("/checkout")} className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 sm:px-5 py-2 sm:py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                    >
                                        Subscribe
                                    </button>
                                )  
                            }
                        </div>
                    </div>

                    <div className="space-y-2 text-lg sm:text-xl">
                        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-5 text-center">

                            {
                                state?.title
                            }
                        </h1>
                        <p className="text-yellow-500">Course description : </p>
                        <p className="text-white">{state?.description}</p>
                    </div>
                </div>
            </div> 
        </HomeLayout>
    )
}

export default CourseDescription
