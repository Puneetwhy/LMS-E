import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../redux/slices/authSlice";
import HomeLayout from "../layouts/HomeLayout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // ✅ One-click fill for recruiter
  const fillAdminCredentials = () => {
    setLoginData({
      email: "admin@example.com",
      password: "Admin@1234",
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all details");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await dispatch(login(loginData));
      if (response?.payload?.success) {
        // Save token for Bearer auth fallback
        if (response.payload.token) {
          localStorage.setItem("token", response.payload.token);
        }
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh] gap-4 px-4">

        {/* ===== RECRUITER NOTICE BANNER ===== */}
        <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-96 bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-4 text-sm text-yellow-300">
          <p className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <span>👋</span> Hey Recruiter / Reviewer!
          </p>
          <p className="text-yellow-200 mb-3 leading-relaxed">
            Want to explore the <span className="font-semibold text-yellow-400">Admin Dashboard</span>? Use the credentials below — or just click the button to auto-fill.
          </p>
          <div className="bg-black/30 rounded-lg px-3 py-2 font-mono text-xs text-yellow-100 mb-3 space-y-1">
            <p><span className="text-yellow-500">Email:</span> admin@example.com</p>
            <p><span className="text-yellow-500">Password:</span> Admin@1234</p>
          </div>
          <button
            type="button"
            onClick={fillAdminCredentials}
            className="w-full py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-lg transition"
          >
            ⚡ Auto-fill Admin Credentials
          </button>
        </div>

        {/* ===== LOGIN FORM ===== */}
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col gap-4 p-6 text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-96 shadow-[0_0_10px_black] bg-white/5 rounded-lg"
        >
          <h1 className="text-2xl text-center font-bold">Login</h1>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="bg-transparent px-4 py-2 border border-gray-600 rounded focus:border-yellow-500 outline-none"
              onChange={handleUserInput}
              value={loginData.email}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="bg-transparent px-4 py-2 border border-gray-600 rounded focus:border-yellow-500 outline-none"
              onChange={handleUserInput}
              value={loginData.password}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-600 py-2.5 rounded font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">Signup</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
