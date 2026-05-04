import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { createAccount } from "../redux/slices/authSlice";
import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setSignupData({ ...signupData, avatar: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewImage(reader.result);
  };

  const createNewAccount = async (e) => {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password) {
      toast.error("All fields are required");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name must be at least 5 characters");
      return;
    }
    if (!isEmail(signupData.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!isValidPassword(signupData.password)) {
      toast.error("Password must be strong (8+ chars with uppercase, number, special char)");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    if (signupData.avatar) formData.append("avatar", signupData.avatar);

    const res = await dispatch(createAccount(formData));

    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col gap-4 p-6 text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/4 shadow-[0_0_10px_black] rounded-lg bg-white/5"
        >
          <h1 className="text-2xl font-bold text-center">Create Account</h1>

          <label htmlFor="avatar" className="cursor-pointer self-center">
            {previewImage ? (
              <img src={previewImage} alt="preview" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <BsPersonCircle className="w-24 h-24 text-gray-400" />
            )}
          </label>
          <input type="file" id="avatar" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImage} />

          {/* Other fields same as before with autoComplete */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="name"
            className="bg-transparent px-4 py-2 border rounded focus:border-yellow-500"
            onChange={handleInput}
            value={signupData.fullName}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            className="bg-transparent px-4 py-2 border rounded focus:border-yellow-500"
            onChange={handleInput}
            value={signupData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="bg-transparent px-4 py-2 border rounded focus:border-yellow-500"
            onChange={handleInput}
            value={signupData.password}
          />

          <button type="submit" className="bg-yellow-600 py-2.5 rounded font-semibold hover:bg-yellow-500">
            Create Account
          </button>

          <p className="text-center">
            Already have account?{" "}
            <Link to="/login" className="text-cyan-400">Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;