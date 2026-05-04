import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth) || {};
  const role = authState.role;

  const course = state || {};

  if (!course?._id && !id) {
    return (
      <HomeLayout>
        <div className="text-white text-center mt-20 text-xl">
          No course data found
        </div>
      </HomeLayout>
    );
  }

  const isPaid = course?.isPurchased === true || course?.paymentStatus === "paid";

  return (
    <HomeLayout>
      <div className="min-h-[90vh] py-12 px-5 sm:px-10 lg:px-20 flex items-center justify-center text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-gray-800 rounded-xl p-6 sm:p-10 shadow-lg">

          {/* LEFT SIDE - Image & Info */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg">
              <img
                className="w-full h-60 sm:h-72 object-cover rounded-lg hover:scale-105 transition duration-500"
                src={course?.thumbnail?.secure_url || "/default-course.jpg"}
                alt="thumbnail"
              />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="bg-gray-900 px-4 py-2 rounded-md border border-gray-700">
                <span className="text-yellow-500 font-semibold">Lectures:</span>{" "}
                {course?.numberOfLectures ?? 0}
              </div>

              <div className="bg-gray-900 px-4 py-2 rounded-md border border-gray-700">
                <span className="text-yellow-500 font-semibold">Instructor:</span>{" "}
                {course?.createdBy}
              </div>
            </div>

            {/* Role-based Buttons */}
            {role === "ADMIN" ? (
              <div className="space-y-3">
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", {
                      state: { courseId: id || course._id, ...course },
                    })
                  }
                  className="w-full bg-green-600 py-3 rounded-md font-semibold hover:bg-green-500 transition"
                >
                  View / Manage Lectures
                </button>

                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { courseId: id || course._id, ...course },
                    })
                  }
                  className="w-full bg-yellow-600 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
                >
                  + Add New Lecture
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!isPaid) {
                    navigate("/checkout", {
                      state: { courseId: id || course._id, ...course },
                    });
                  } else {
                    navigate("/course/displaylectures", {
                      state: { courseId: id || course._id, ...course },
                    });
                  }
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-lg font-bold py-3 rounded-md hover:scale-105 hover:shadow-lg transition duration-300"
              >
                {isPaid ? "Watch Lectures" : "Buy Course - ₹499"}
              </button>
            )}
          </div>

          {/* RIGHT SIDE - Description */}
          <div className="space-y-6 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 text-center lg:text-left">
              {course?.title}
            </h1>

            <div className="space-y-3">
              <p className="text-yellow-500 font-semibold text-lg">Course Description</p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {course?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;