import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layouts/HomeLayout"
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {

    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return(
        <>
            <HomeLayout >
                <div className="min-h-[90vh] flex flex-col pt-8 sm:pt-12 px-4 sm:px-10 md:px-20 gap-8 sm:gap-10 text-white">


                    <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5 px-2">
                        Explore the Courses made by
                        <span className="font-bold text-yellow-500">
                            Industry experts
                        </span>
                    </h1>
                        
                    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
                        {courseData?.map((element) => {
                            return <CourseCard key={element._id} data={ element }/>
                        })}
                    </div>

                </div>
            </HomeLayout >
        </> 
    )
}

export default CourseList;
