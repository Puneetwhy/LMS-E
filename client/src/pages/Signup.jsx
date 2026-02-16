import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../layouts/HomeLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast'
import { createAccount } from '../redux/slices/authSlice'
import { isEmail, isValidPassword } from "../helpers/regexMatcher";

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [prevImage, setPrevImage] = useState("");
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const getImage = (event) => {
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPrevImage(this.result)
            })
        }
    }

    const createNewAccount = async (event) => {
        event.preventDefault();

        if (!signupData.email || !signupData.fullName || !signupData.password) {
            toast.error("Please fill all the details");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be at least 5 characters");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be at least 8 characters long with at least one number, one uppercase letter, one lowercase letter and one special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));

        if (response?.payload?.success) {
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            });
            setPrevImage("");
            navigate("/")
        }
    };

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">

                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center rounded-lg gap-3 p-4 text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/4 shadow-[0_0_10px_black]">

                    <h1 className="text-xl sm:text-2xl text-center font-bold">
                        Registration Page
                    </h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {prevImage ? (
                            <img src={prevImage} alt="avatar" className="w-24 h-24 rounded-full m-auto" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>

                    <input
                        onChange={getImage}
                        type="file"
                        className="hidden"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg" />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold ">
                            Name
                        </label>

                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name.."
                            autocomplete="name"
                            className="bg-transparent px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.fullName} />
                    </div>

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
                            autocomplete="email"
                            className="bg-transparent px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.email} />
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
                            autocomplete="new-password"
                            className="bg-transparent px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.password} />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 py-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-2 rounded-sm font-semibold text-base sm:text-lg cursor-pointer">Create account</button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="link text-cyan-600 cursor-pointer">Login</Link>
                    </p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default Signup;