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
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6 py-10">

    {/* Title */}
    <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
      Admin Dashboard
    </h1>

    {/* Top Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400">Users</p>
          <h2 className="text-2xl font-bold">{allUserCount}</h2>
        </div>
        <FaUsers className="text-yellow-400 text-3xl" />
      </div>

      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400">Subscribers</p>
          <h2 className="text-2xl font-bold">{subscribedCount}</h2>
        </div>
        <FaUsers className="text-green-400 text-3xl" />
      </div>

      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400">Sales</p>
          <h2 className="text-2xl font-bold">{allPayments?.count}</h2>
        </div>
        <FcSalesPerformance className="text-3xl" />
      </div>

      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{(allPayments?.count || 0) * 499}
          </h2>
        </div>
        <GiMoneyStack className="text-green-400 text-3xl" />
      </div>

    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

      {/* Pie */}
      <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">
          User Distribution
        </h2>
        <div className="h-64 flex justify-center">
          <Pie data={userData} />
        </div>
      </div>

      {/* Bar */}
      <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">
          Monthly Sales
        </h2>
        <div className="h-64">
          <Bar data={salesData} />
        </div>
      </div>

    </div>

    {/* Courses Section */}
    <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-lg">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Courses</h2>

        <button
          onClick={() => navigate("/create/course")}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition-all"
        >
          + Create Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">

          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-3">#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myCourses.map((course, idx) => (
              <tr
                key={course._id}
                className="border-b border-gray-800 hover:bg-white/5 transition"
              >
                <td className="py-3">{idx + 1}</td>

                <td className="max-w-[150px] truncate">
                  {course.title}
                </td>

                <td>{course.category}</td>
                <td>{course.createdBy}</td>
                <td className="flex gap-3 py-2">

                  <button
                    className="bg-green-500 hover:bg-green-600 p-2 rounded-md"
                    onClick={() => {
                    navigate("course/displaylectures")
                  }}
                  >
                    <BsCollectionPlayFill />
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-md"
                    onClick={() => onCourseDelete(course._id)}
                  >
                    <BsTrash />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  </div>
</HomeLayout>
  )
}

export default AdminDashboard
