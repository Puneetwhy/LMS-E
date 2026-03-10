import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {

  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white pt-24 px-5 sm:px-10 lg:px-20 pb-20">

        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Explore Courses by
            <span className="text-yellow-500"> Industry Experts</span>
          </h1>

          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Learn from experienced instructors and upgrade your skills with
            practical industry level courses.
          </p>

        </div>


        {/* COURSE GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {courseData?.length > 0 ? (
            courseData.map((element) => {
              return (
                <div
                  key={element._id}
                  className="hover:scale-[1.03] transition duration-300"
                >
                  <CourseCard data={element} />
                </div>
              );
            })
          ) : (

            /* EMPTY STATE */

            <div className="col-span-full text-center text-gray-400 text-lg py-20">
              No courses available right now.
            </div>

          )}

        </div>

      </div>
    </HomeLayout>
  );
};

export default CourseList;