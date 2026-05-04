import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { deleteCourse, getAllCourses } from "../../redux/slices/courseSlice";
import { getStatData } from "../../redux/slices/statSlice";
import { getPaymentRecord } from "../../redux/slices/RazorpaySlice";
import { FcSalesPerformance } from "react-icons/fc";
import { Pie, Bar } from "react-chartjs-2";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statState = useSelector((state) => state.stat) || {};
  const razorState = useSelector((state) => state.razorpay) || {};
  const courseState = useSelector((state) => state.course) || {};

  const { allUserCount = 0, subscribedCount = 0 } = statState;
  const { allPayments = { count: 0 }, monthlySalesRecord = [] } = razorState;
  const myCourses = Array.isArray(courseState.courseData)
    ? courseState.courseData
    : [];

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStatData());
    dispatch(getPaymentRecord());
  }, [dispatch]);

  async function onCourseDelete(id) {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const res = await dispatch(deleteCourse(id));
    if (res?.payload?.success) {
      dispatch(getAllCourses());
      toast.success("Course deleted successfully");
    }
  }

  const safeMonthlyData =
    Array.isArray(monthlySalesRecord) && monthlySalesRecord.length === 12
      ? monthlySalesRecord
      : new Array(12).fill(0);

  const userData = {
    labels: ["Registered Users", "Subscribed Users"],
    datasets: [
      {
        data: [allUserCount, subscribedCount],
        backgroundColor: ["#F59E0B", "#22C55E"],
        borderColor: "#111827",
        borderWidth: 2,
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: safeMonthlyData,
        backgroundColor: "#F59E0B",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white", font: { size: 13 } },
        position: "bottom",
      },
    },
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-6 py-10">
        
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Users",
              value: allUserCount,
              icon: <FaUsers />,
              color: "text-yellow-400",
            },
            {
              title: "Subscribers",
              value: subscribedCount,
              icon: <FaUsers />,
              color: "text-green-400",
            },
            {
              title: "Total Sales",
              value: allPayments?.count || 0,
              icon: <FcSalesPerformance />,
              color: "text-blue-400",
            },
            {
              title: "Revenue",
              value: `₹${(allPayments?.count || 0) * 499}`,
              icon: <GiMoneyStack />,
              color: "text-emerald-400",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md 
              hover:scale-[1.03] transition-all duration-300 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                </div>
                <div className={`text-4xl ${item.color} group-hover:scale-110 transition`}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[420px] backdrop-blur-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              User Distribution
            </h2>
            <Pie data={userData} options={chartOptions} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[420px] backdrop-blur-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              Monthly Sales
            </h2>
            <Bar data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">
            All Courses
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Course Title</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {myCourses.length > 0 ? (
                  myCourses.map((course, idx) => (
                    <tr
                      key={course?._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-4 px-2">{idx + 1}</td>
                      <td className="py-4 px-2 font-medium">
                        {course?.title}
                      </td>
                      <td className="py-4 px-2 flex gap-3 justify-center">
                        <button
                          onClick={() =>
                            navigate("/course/displaylectures", {
                              state: { courseId: course?._id, ...course },
                            })
                          }
                          className="p-2.5 rounded-lg bg-green-600/80 hover:bg-green-500 transition shadow-md"
                        >
                          <BsCollectionPlayFill />
                        </button>

                        <button
                          onClick={() => onCourseDelete(course?._id)}
                          className="p-2.5 rounded-lg bg-red-600/80 hover:bg-red-500 transition shadow-md"
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-10 text-gray-500"
                    >
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;