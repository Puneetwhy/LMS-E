import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../redux/slices/RazorpaySlice";
import { getUserData } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancellation(){
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("cancellation completed");
        navigate("/");
    }
   
  return (
    <>
        <HomeLayout>
            <div className="min-h-[100vh] flex items-center justify-center ">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-1/3 shadow-[0_0_10px_black]">
                    <img 
                    src={userData?.avatar?.secure_url} 
                    className="w-40 m-auto rounded-full border border-black" />

                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>

                    <div className="grid grid-cols-2 text-center ">
                        <p>Email : </p><p>{userData?.email}</p>
                       
                        <p>Role : </p><p>{userData?.role}</p>
                        
                        <p>Subscritpion : </p>
                        <p>{userData?.subscription?.status === "active"? "Active" : "Inactive"}</p>
                    </div>

                    <div className="flex items-center justify-center gap-4 ">
                        <Link
                        to="/changepassword"
                        className="w-1/3 bg-yellow-600 hover:bg-yellow-500 rounded-md transition-all ease-in-out duration-300 font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Change password
                            </button>
                        </Link>

                        <Link
                        to="/user/editprofile"
                        className="w-1/3 border border-yellow-600 hover:border-yellow-500 rounded-md transition-all ease-in-out duration-300 font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Edit profile
                            </button>
                        </Link>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        {userData?.subscription?.status === "active" && (
                        <button onClick={handleCancellation} className="w-2/3 text-center bg-orange-600 hover:bg-orange-500 py-2 rounded-md  transition-all ease-in-out duration-300"> 
                            Cancel subscription
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    </>
  )
}

export default UserProfile
