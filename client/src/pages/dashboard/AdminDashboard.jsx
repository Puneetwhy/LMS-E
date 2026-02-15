import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout"
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react-icons/fc";
import { FaUsers } from "react-icons/fa ";
import { deleteCourse, getAllCourses } from "../../redux/slices/courseSlice"
import { getStatData} from "../../redux/slices/statSlice"
import { getPaymentRecord } from "../../redux/slices/RazorpaySlice";
import { FcSalesPerformance } from
import { Pie, Bar } from 'react-chartjs-2';
import { GiMoneyStack } from "react/icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {allUserCount , subscribedCount} = useSelector();
    const [allPayments, finalMonths, monthlySalesRecord] = useSelector((state) => state.razorpay); 

    const userData = {
      labels: ["Registered User", "Enrolled User"],
      fontColor:"white",
      datasets:[{
        label:"User Details",
        data: [allUserCount, subscribedCount],
        backgroundColor:["yellow", "green"],
        borderWidth: 1,
        borderColer: ["yellow", "green"]
      }]
    };

    const salesData = {
      labels: ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      fontColor: "white",
      datasets:[{
        label:"Sales/Month",
        data: monthlySalesRecord,
        backgroundColor:["rgb(255, 99, 132)"],
        borderWidth: 2, 
        borderColer: ["white"]
      }]
    };

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(){
      if(window.confirm("Are you sure you want to delete the course ?")){
        const res = await dispatch(deleteCourse(id));
        if(res?.payload?.success){
          await dispatch(getAllCourses());
        }
      }
    }

    useEffect({
      (
        async () => {
          await dispatch(getAllCourses());
          await dispatch(getStatData());
          await dispatch(getPaymentRecord());
        }
      )()
    }, [])

  return (
    <HomeLayout>
        <div className="min-h-[100vh] flex pt-5 flex-wrap flex-col text-white items-center justify-center">
          <h1 className="text-center text-5xl font-semibold text-yellow-500">
            Admin Dashboard
          </h1>

          <div className="grid grid-col-2 gap-5 m-auto mx-10">
            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                <div className="w-80 h-80 ">
                  <Pie data={userData} />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Registered Users
                      </p>
                      <h3 className="text-4xl font-bold ">
                        {allUserCount}
                      </h3>
                    </div>
                    <FaUsers className="text-yellow-500 text-5xl "/>
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
                    <FaUsers className="text-green-500 text-5xl "/>
                  </div>
                </div>
            </div>  

            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
              <div className="h-80 w-full relative">
                <Bar data={salesData}
                  className="absolute bottom-0 h-80 w-full"/>
              </div>
              <div className="grid grid-cols-2 gap-5">
                 <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Subscription Count
                      </p>
                      <h3 className="text-4xl font-bold ">
                        {allPayments?.count}
                      </h3>
                    </div>
                    <FcSalesPerformance className="text-green-500 text-5xl "/>
                  </div>

                  <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Total Revenue
                      </p>
                      <h3 className="text-4xl font-bold ">
                        {allPayments?.count * 499}
                      </h3>
                    </div>
                    <GiMoneyStack className="text-green-500 text-5xl "/>
                  </div>
              </div>
            </div>
          </div>

          <div className="mx-[10%] w-[80%] flex flex-col self-center items-center justify-center gap-10 mb-10">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-center text-3xl font-semibold">Courses Overview</h1>

              <button onClick={() => {
                navigate("/course/create")
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 runded-md py-2 px-4 font-semibold text-lg cursor-pointer ">
                  Create new course
              </button>
            </div>

            <table className="table overflow-x-scroll">
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
    </HomeLayout>
  )
}

export default AdminDashboard
