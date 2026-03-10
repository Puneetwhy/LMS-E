import HomeLayout from "../layouts/HomeLayout";
import AboutImage from "../assets/images/AboutImage.png";
import Admin_Profile from "../assets/images/Admin_Profile.png";
import boy_profile1 from "../assets/images/boy_profile1.png";
import boy_profile2 from "../assets/images/boy_profile2.png";
import girl_profile1 from "../assets/images/girl_profile1.png";
import girl_profile2 from "../assets/images/girl_profile2.png";

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="text-white pt-20 overflow-hidden">

        {/* HERO */}
        <section className="px-5 sm:px-10 lg:px-20 py-16">

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* TEXT */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Affordable & Quality
                <span className="text-yellow-500"> Education</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg">
                Our goal is to provide affordable and quality education to the
                world. Teachers and students share their knowledge and grow
                together.
              </p>

              <button className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition">
                Explore Courses
              </button>

            </div>


            {/* IMAGE + ANIMATION */}
            <div className="lg:w-1/2 flex justify-center relative items-center">

              {/* RINGS */}
              <div className="absolute w-[260px] sm:w-[320px] lg:w-[360px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-full border border-yellow-500/20 spin-slow"></div>

              <div className="absolute w-[200px] sm:w-[250px] lg:w-[280px] h-[200px] sm:h-[250px] lg:h-[280px] rounded-full border border-yellow-500/30 spin-reverse"></div>

              <div className="absolute w-[150px] sm:w-[180px] lg:w-[200px] h-[150px] sm:h-[180px] lg:h-[200px] bg-yellow-500/10 rounded-full blur-2xl"></div>


              {/* DOTS */}
              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-0 left-1/2 animate-bounce"></div>

              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full bottom-0 left-1/3 animate-pulse"></div>

              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full right-0 top-1/3 animate-bounce"></div>

              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full left-0 top-1/3 animate-pulse"></div>

              <div className="absolute w-2 h-2 bg-yellow-300 rounded-full bottom-10 right-10 animate-bounce"></div>

              <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-10 left-10 animate-pulse"></div>


              {/* IMAGE */}
              <img
                src={AboutImage}
                alt="about"
                className="relative z-10 w-52 sm:w-64 lg:w-72 hover:scale-105 transition duration-500"
              />

            </div>

          </div>

        </section>



        {/* STATS */}
        <section className="bg-gradient-to-r from-gray-900 rounded-md mt-10 mb-10 to-black py-14">

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500">10K+</h1>
              <p className="text-gray-400">Students</p>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500">500+</h1>
              <p className="text-gray-400">Courses</p>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500">150+</h1>
              <p className="text-gray-400">Instructors</p>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500">20+</h1>
              <p className="text-gray-400">Countries</p>
            </div>

          </div>

        </section>



        {/* FEATURES */}
        <section className="px-5 sm:px-10 lg:px-20 py-20">

          <div className="text-center mb-12">

            <h2 className="text-3xl sm:text-4xl font-bold">
              Why <span className="text-yellow-500">Choose Us</span>
            </h2>

            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Best learning experience for students
            </p>

          </div>


          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-2">

              <h3 className="text-xl font-semibold mb-2">
                Expert Teachers
              </h3>

              <p className="text-gray-400 text-sm">
                Learn from experienced professionals.
              </p>

            </div>


            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-2">

              <h3 className="text-xl font-semibold mb-2">
                Practical Learning
              </h3>

              <p className="text-gray-400 text-sm">
                Real world project based courses.
              </p>

            </div>


            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-2">

              <h3 className="text-xl font-semibold mb-2">
                Affordable Price
              </h3>

              <p className="text-gray-400 text-sm">
                Quality education at affordable price.
              </p>

            </div>

          </div>

        </section>



        {/* TEAM */}
       {/* TEAM */}
<section className="px-6 sm:px-10 lg:px-20 py-24">

  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
    Meet Our <span className="text-yellow-500">Team</span>
  </h2>


  <div className="flex gap-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide">


    {/* ADMIN */}
    <div className="snap-center min-w-[260px] bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-3 hover:scale-105">

      <img
        src={Admin_Profile}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
      />

      <h1 className="text-xl font-semibold text-center">
        Admin
      </h1>

      <p className="text-gray-400 text-center text-sm mt-2">
        Platform founder and mentor
      </p>

    </div>



    {/* SAMRAAT */}
    <div className="snap-center min-w-[260px] bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-3 hover:scale-105">

      <img
        src={boy_profile1}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
      />

      <h1 className="text-xl font-semibold text-center">
        Samraat
      </h1>

      <p className="text-gray-400 text-center text-sm mt-2">
        Programming instructor
      </p>

    </div>



    {/* PUNEET */}
    <div className="snap-center min-w-[260px] bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-3 hover:scale-105">

      <img
        src={boy_profile2}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
      />

      <h1 className="text-xl font-semibold text-center">
        Puneet
      </h1>

      <p className="text-gray-400 text-center text-sm mt-2">
        Full stack mentor
      </p>

    </div>



    {/* AISHWARYA */}
    <div className="snap-center min-w-[260px] bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-3 hover:scale-105">

      <img
        src={girl_profile1}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
      />

      <h1 className="text-xl font-semibold text-center">
        Aishwarya
      </h1>

      <p className="text-gray-400 text-center text-sm mt-2">
        UI/UX designer
      </p>

    </div>



    {/* PRATIBHA */}
    <div className="snap-center min-w-[260px] bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition hover:-translate-y-3 hover:scale-105">

      <img
        src={girl_profile2}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
      />

      <h1 className="text-xl font-semibold text-center">
        Pratibha
      </h1>

      <p className="text-gray-400 text-center text-sm mt-2">
        Student mentor
      </p>

    </div>


  </div>

</section>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;