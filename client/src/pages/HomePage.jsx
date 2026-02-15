import HomeLayout from "../layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomepageImage from "../assets/images/HomepageImage.png"
const Homepage = () => {
    return(
        <>
            <HomeLayout >
                <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center gap-10 px-5 sm:px-10 lg:px-16 min-h-[90vh]">
                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            Find out best  
                            <span className="text-yellow-500 font-bold ">
                                 Online courses
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-400">
                            We have large library of courses taught by highly skilled and qualified faculties
                            <br /> at a very affordable cost.
                        </p>

                       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                            <Link to="/courses">
                                <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                    Explore courses
                                </button>
                            </Link>

                            <Link to="/contact">
                                <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                    Contact Us  
                                </button>
                            </Link>
                        </div>
                    </div>

                   <div className="w-full lg:w-1/3 flex items-center justify-center">
                        <img src={HomepageImage} alt="homepage image" className="w-60 sm:w-72 lg:w-full"/>
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default Homepage;