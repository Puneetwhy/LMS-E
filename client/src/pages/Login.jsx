import HomeLayout from "../layouts/HomeLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast'
import { login } from '../redux/slices/authSlice'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }


    const onLogin = async (event) => {
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        const response = await dispatch(login(loginData));

        if (response?.payload?.success) {
            setLoginData({
                email: "",
                password: "",
            });
            navigate("/")
        }
    };

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">

                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center rounded-lg gap-3 p-4 text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/4 shadow-[0_0_10px_black]">

                    <h1 className="text-xl sm:text-2xl text-center font-bold">Login Page</h1>

                    <div className="flex flex-col gap-1 ">
                        <label htmlFor="email" className="font-semibold ">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-3 py-2 border rounded-sm"
                            onChange={handleUserInput}
                            value={loginData.email} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold ">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-3 py-2 border rounded-sm"
                            onChange={handleUserInput}
                            value={loginData.password} />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 py-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-2 rounded-sm font-semibold text-lg cursor-pointer">Login</button>

                    <p className="text-center">
                        Don't have an account ? <Link to="/signup" className="link text-cyan-600 cursor-pointer">Signup</Link>
                    </p>
                </form>

            </div> 
        </HomeLayout>
    )
}

export default Login;