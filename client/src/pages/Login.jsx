import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";
import { login } from "../redux/slices/authSlice";
import HomeLayout from "../layouts/HomeLayout";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all details");
            return;
        }

        try {
            const response = await dispatch(login(loginData));
            
            if (response?.payload?.success) {
                toast.success("Login Successful!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Login Failed");
        }
    };

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">
                <form 
                    noValidate 
                    onSubmit={onLogin} 
                    className="flex flex-col gap-4 p-6 text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/4 shadow-[0_0_10px_black] bg-white/5 rounded-lg"
                >
                    <h1 className="text-2xl text-center font-bold">Login</h1>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="bg-transparent px-4 py-2 border border-gray-600 rounded focus:border-yellow-500"
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
                            className="bg-transparent px-4 py-2 border border-gray-600 rounded focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={loginData.password}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-yellow-600 py-2.5 rounded font-semibold hover:bg-yellow-500 transition"
                    >
                        Login
                    </button>

                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-cyan-400 hover:underline">Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
};

export default Login;