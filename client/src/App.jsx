import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CourseList from "./pages/course/CourseList";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import CourseDescription from "./pages/course/CourseDescription";
import RequireAuth from "./components/auth/RequireAuth";
import CreateCourse from "./pages/course/CreateCourse";
import UserProfile from "./pages/user/UserProfile";
import EditProfile from "./pages/user/EditProfile";
import Checkout from "./pages/payment/Checkout";
import CheckoutSuccess from "./pages/payment/CheckoutSuccess";
import CheckoutFailure from "./pages/payment/CheckoutFailure";
import DisplayLectures from "./pages/dashboard/DisplayLectures";
import AddLecture from "./pages/dashboard/AddLecture";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={<Denied />} />

      {/* ADMIN */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/create/course" element={<CreateCourse />} />
        <Route path="/course/addlecture" element={<AddLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/course/description/:id" element={<CourseDescription />} />
      </Route>

      {/* USER + ADMIN */}
      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/editprofile" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFailure />} />

        {/* 🔥 FIXED ROUTE */}
        <Route path="/course/displaylectures/:courseId" element={<DisplayLectures />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;