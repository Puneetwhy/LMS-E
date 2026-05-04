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
  Title
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

  const { allUserCount = 0, subscribedCount = 0 } =
    useSelector((state) => state.stat);

  const { allPayments = { count: 0 }, monthlySalesRecord = [] } =
    useSelector((state) => state.razorpay);

  const myCourses =
    useSelector((state) => state.course?.courseData) || [];

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatData());
      await dispatch(getPaymentRecord());
    };

    loadData();
  }, [dispatch]);

  async function onCourseDelete(id) {
    if (window.confirm("Delete course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) dispatch(getAllCourses());
    }
  }

  const safeMonthlyData =
    Array.isArray(monthlySalesRecord) && monthlySalesRecord.length === 12
      ? monthlySalesRecord
      : new Array(12).fill(0);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "Users",
        data: [allUserCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1
      }
    ]
  };

  const salesData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: safeMonthlyData,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "white",
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" }
      }
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6 py-10">

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          Admin Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="p-6 bg-white/5 border border-gray-700 rounded-xl flex justify-between">
            <div>
              <p className="text-gray-400">Users</p>
              <h2 className="text-2xl font-bold">{allUserCount}</h2>
            </div>
            <FaUsers className="text-yellow-400 text-3xl" />
          </div>

          <div className="p-6 bg-white/5 border border-gray-700 rounded-xl flex justify-between">
            <div>
              <p className="text-gray-400">Subscribers</p>
              <h2 className="text-2xl font-bold">{subscribedCount}</h2>
            </div>
            <FaUsers className="text-green-400 text-3xl" />
          </div>

          <div className="p-6 bg-white/5 border border-gray-700 rounded-xl flex justify-between">
            <div>
              <p className="text-gray-400">Sales</p>
              <h2 className="text-2xl font-bold">{allPayments?.count}</h2>
            </div>
            <FcSalesPerformance className="text-3xl" />
          </div>

          <div className="p-6 bg-white/5 border border-gray-700 rounded-xl flex justify-between">
            <div>
              <p className="text-gray-400">Revenue</p>
              <h2 className="text-2xl font-bold">
                ₹{(allPayments?.count || 0) * 499}
              </h2>
            </div>
            <GiMoneyStack className="text-green-400 text-3xl" />
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          <div className="bg-white/5 border border-gray-700 rounded-xl p-6">
            <h2 className="mb-4 text-gray-300">User Distribution</h2>
            <Pie data={userData} options={chartOptions} />
          </div>

          <div className="bg-white/5 border border-gray-700 rounded-xl p-6">
            <h2 className="mb-4 text-gray-300">Monthly Sales</h2>
            <Bar data={salesData} options={chartOptions} />
          </div>

        </div>

        {/* COURSES */}
        <div className="bg-white/5 border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl mb-6">Courses</h2>

          <table className="w-full text-left">
            <tbody>
              {myCourses.map((course, idx) => (
                <tr key={course._id}>
                  <td>{idx + 1}</td>
                  <td>{course.title}</td>

                  <td className="flex gap-3 py-2">
                    <button
                      className="bg-green-500 p-2 rounded"
                      onClick={() =>
                        navigate(`/course/${course._id}/lectures`, {
                          state: course
                        })
                      }
                    >
                      <BsCollectionPlayFill />
                    </button>

                    <button
                      className="bg-red-500 p-2 rounded"
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
    </HomeLayout>
  );
};

export default AdminDashboard;