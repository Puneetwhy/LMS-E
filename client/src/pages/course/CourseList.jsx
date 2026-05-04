import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData = [], loading } = useSelector((state) => state.course) || {};

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white pt-24 px-5 sm:px-10 lg:px-20 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h5 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Explore Courses by <span className="text-yellow-500">Experts</span>
          </h5>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Learn from experienced instructors and upgrade your skills with practical industry-level courses.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl">Loading courses...</div>
        ) : Array.isArray(courseData) && courseData.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courseData.map((course) => (
              <CourseCard key={course?._id} data={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 py-20 gap-4">
            <p className="text-lg sm:text-xl font-semibold">No courses available right now.</p>
            <p className="text-gray-500 max-w-md">
              Please check back later or create a new course if you are an admin.
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default CourseList;