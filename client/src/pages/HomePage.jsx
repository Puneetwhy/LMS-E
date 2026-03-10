import HomeLayout from "../layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomepageImage from "../assets/images/HomepageImage.png";

const Homepage = () => {
  return (
    <HomeLayout>
      <div className="text-white">

        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex items-center px-6 sm:px-12 lg:px-20 pt-28 lg:pt-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

            {/* LEFT CONTENT */}
            <div className="space-y-8 text-center lg:text-left">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find the Best
                <span className="block text-yellow-500">
                  Online Courses
                </span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                We provide a huge library of courses taught by highly skilled
                instructors. Learn new skills and upgrade your career with
                affordable courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

                <Link to="/courses">
                  <button className="bg-yellow-500 hover:bg-yellow-600 px-7 py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-500/30 transition duration-300">
                    Explore Courses
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="border border-yellow-500 px-7 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition duration-300">
                    Contact Us
                  </button>
                </Link>

              </div>

            </div>

            {/* RIGHT IMAGE WITH ANIMATION */}
            <div className="flex justify-center relative items-center mb-18 lg:mb-0 mt-5 lg:mt-0">

              {/* OUTER ORBIT */}
              <div className="absolute w-[260px] sm:w-[340px] lg:w-[420px] h-[260px] sm:h-[340px] lg:h-[420px] rounded-full border border-yellow-500/20 spin-slow">

                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-0 left-1/2 -translate-x-1/2 shadow-lg shadow-yellow-500"></div>

              </div>

              {/* MIDDLE ORBIT */}
              <div className="absolute w-[200px] sm:w-[280px] lg:w-[340px] h-[200px] sm:h-[280px] lg:h-[340px] rounded-full border border-yellow-500/30 spin-reverse">

                <div className="absolute w-2 h-2 bg-yellow-300 rounded-full bottom-0 left-1/2 -translate-x-1/2"></div>

              </div>

              {/* INNER GLOW */}
              <div className="absolute w-[150px] sm:w-[200px] lg:w-[260px] h-[150px] sm:h-[200px] lg:h-[260px] rounded-full border border-yellow-500/40 animate-pulse"></div>

              {/* IMAGE */}
              <img
                src={HomepageImage}
                alt="homepage"
                className="relative z-10 w-56 sm:w-72 lg:w-96 hover:scale-105 transition duration-500"
              />

            </div>

          </div>

        </section>



        {/* WHY CHOOSE SECTION */}
        <section className="py-24 bg-black/30 rounded-md transition duration-500 hover:-translate-y-3 shadow-xl hover:shadow-black-500/20">

          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-3xl sm:text-4xl font-bold mb-14">
              Why Choose Our Platform
            </h2>

            <div className="grid md:grid-cols-3 gap-10">

              <div className="group p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500 transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/20">

                <div className="text-yellow-500 text-4xl mb-4 group-hover:scale-110 transition">
                  🎓
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  Expert Teachers
                </h3>

                <p className="text-gray-400">
                  Courses are taught by experienced professionals with real
                  industry knowledge.
                </p>

              </div>

              <div className="group p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500 transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/20">

                <div className="text-yellow-500 text-4xl mb-4 group-hover:scale-110 transition">
                  💰
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  Affordable Courses
                </h3>

                <p className="text-gray-400">
                  High quality learning experience at a very affordable price.
                </p>

              </div>

              <div className="group p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500 transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/20">

                <div className="text-yellow-500 text-4xl mb-4 group-hover:scale-110 transition">
                  ⏳
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  Lifetime Access
                </h3>

                <p className="text-gray-400">
                  Learn anytime with lifetime access to purchased courses.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* STATS SECTION */}
        <section className="py-24">

          <div className="max-w-6xl mx-auto px-6 text-center">

            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Our Achievements
            </h2>

            <div className="grid sm:grid-cols-3 gap-10">

              <div className="hover:scale-110 transition duration-300">
                <h3 className="text-5xl font-bold text-yellow-500">
                  10K+
                </h3>
                <p className="text-gray-400 mt-2">
                  Students
                </p>
              </div>

              <div className="hover:scale-110 transition duration-300">
                <h3 className="text-5xl font-bold text-yellow-500">
                  200+
                </h3>
                <p className="text-gray-400 mt-2">
                  Courses
                </p>
              </div>

              <div className="hover:scale-110 transition duration-300">
                <h3 className="text-5xl font-bold text-yellow-500">
                  50+
                </h3>
                <p className="text-gray-400 mt-2">
                  Expert Instructors
                </p>
              </div>

            </div>

            <div className="mt-12">

              <Link to="/courses">
                <button className="bg-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:scale-105 transition duration-300">
                  Start Learning Today
                </button>
              </Link>

            </div>

          </div>

        </section>

      </div>
    </HomeLayout>
  );
};

export default Homepage;