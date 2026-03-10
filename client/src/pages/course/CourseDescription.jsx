import { useNavigate, useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] py-12 px-5 sm:px-10 lg:px-20 flex items-center justify-center text-white">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-gray-800 rounded-xl p-6 sm:p-10 shadow-lg">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div className="overflow-hidden rounded-lg">
              <img
                className="w-full h-60 sm:h-72 object-cover rounded-lg hover:scale-105 transition duration-500"
                src={state?.thumbnail?.secure_url}
                alt="thumbnail"
              />
            </div>

            {/* COURSE INFO */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">

              <div className="bg-gray-900 px-4 py-2 rounded-md border border-gray-700">
                <span className="text-yellow-500 font-semibold">
                  Lectures:
                </span>{" "}
                {state?.numberoflectures}
              </div>

              <div className="bg-gray-900 px-4 py-2 rounded-md border border-gray-700">
                <span className="text-yellow-500 font-semibold">
                  Instructor:
                </span>{" "}
                {state?.createdBy}
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/course/displaylectures", { state: { ...state } })
              }
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-lg font-bold py-3 rounded-md hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Watch Lectures
            </button>

          </div>


          {/* RIGHT SIDE */}
          <div className="space-y-6 flex flex-col justify-center">

            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 text-center lg:text-left">
              {state?.title}
            </h1>

            <div className="space-y-3">

              <p className="text-yellow-500 font-semibold text-lg">
                Course Description
              </p>

              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {state?.description}
              </p>

            </div>

          </div>

        </div>

      </div>
    </HomeLayout>
  );
};

export default CourseDescription;