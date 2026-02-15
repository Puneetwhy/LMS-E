import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout"
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { deleteCourse, getAllCourses } from "../../redux/slices/courseSlice"
import { getStatData} from "../../redux/slices/statSlice"
import { getPaymentRecord } from "../../redux/slices/RazorpaySlice";
import { FcSalesPerformance } from "react-icons/fc";
import { Pie, Bar } from 'react-chartjs-2';
import { GiMoneyStack } from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUserCount = 0, subscribedCount = 0 } = useSelector(state => state.stat);
    const { allPayments = { count: 0 }, monthlySalesRecord = [] } = useSelector(state => state.razorpay);

    const userData = {
      labels: ["Registered User", "Enrolled User"],
      fontColor:"white",
      datasets:[{
        label:"User Details",
        data: [allUserCount, subscribedCount],
        backgroundColor:["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      }]
    };

    const salesData = {
      labels: ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      fontColor: "white",
      datasets:[{
        label:"Sales/Month",
        data: monthlySalesRecord?.length === 12 ? monthlySalesRecord : new Array(12).fill(0),
        backgroundColor:"rgb(255, 99, 132)",
        borderWidth: 2, 
        borderColor: ["white"]
      }]
    };

    const myCourses = useSelector(state => state.course?.courseData || []);

    async function onCourseDelete(id){
      if(window.confirm("Are you sure you want to delete the course ?")){
        const res = await dispatch(deleteCourse(id));
        if(res?.payload?.success){
          await dispatch(getAllCourses());
        }
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        await dispatch(getAllCourses());
        await dispatch(getStatData());
        await dispatch(getPaymentRecord());
      };

      fetchData();
    }, []);

  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex pt-6 sm:pt-10 flex-col text-white items-center px-4 sm:px-8">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-yellow-500">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80">
                  <Pie data={userData} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                  <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Registered Users
                      </p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        {allUserCount}
                      </h3>
                    </div>
                    <FaUsers className="text-yellow-500 text-3xl sm:text-4xl md:text-5xl"/>
                  </div>

                  <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Subscribed Users
                      </p>
                      <h3 className="text-4xl font-bold ">
                        {subscribedCount}
                      </h3>
                    </div>
                    <FaUsers className="text-green-500 text-3xl sm:text-4xl md:text-5xl"
/>
                  </div>
                </div>
            </div>  

            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
              <div className="h-64 sm:h-72 md:h-80 w-full relative">
                <Bar data={salesData}
                  className="absolute bottom-0 h-full w-full"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                 <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Subscription Count
                      </p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        {allPayments?.count}
                      </h3>
                    </div>
                    <FcSalesPerformance className="text-green-500 text-3xl sm:text-4xl md:text-5xl"/>
                  </div>

                  <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Total Revenue
                      </p>
                      <h3 className="text-4xl font-bold ">
                        {(allPayments?.count || 0) * 499}
                      </h3>
                    </div>
                    <GiMoneyStack className="text-green-500 text-5xl "/>
                  </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1200px] flex flex-col items-center justify-center gap-8 sm:gap-10 mb-10 px-4">

            <div className="flex w-full items-center justify-between">
              <h1 className="text-center text-3xl font-semibold">Courses Overview</h1>

              <button onClick={() => {
                navigate("/course/create")
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md py-2 px-4 font-semibold text-sm sm:text-lg cursor-pointer">
                  Create new course
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="table min-w-[900px]">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Course Title</th>
                    <th>Course Category</th>
                    <th>Instructor</th>
                    <th>Total Lectures</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myCourses.map((course, idx) => {
                    return(
                      <tr key={course._id}>

                        <td>{idx + 1}</td>
                        <td><textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                        </td>
                        <td>
                          {course?.category}
                        </td>

                        <td>
                          {course?.createdBy}
                        </td>

                        <td>{course?.nooflectures}</td>

                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                          <textarea 
                            value={course?.description}
                            readOnly
                            className="w-80 h-auto bg-transparent resize-none"></textarea>
                        </td>

                        <td className="flex items-center gap-4 ">
                          <button 
                          className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                          onClick={() => {
                            navigate("/course/displaylectures", {state: {course}}
                            )
                          }}>
                            <BsCollectionPlayFill /> 
                          </button>

                          <button 
                          className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                          onClick={() => onCourseDelete(course?._id)}>
                            <BsTrash /> 
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
          </div>
          </div>
        </div>
    </HomeLayout>
  )
}

export default AdminDashboard
