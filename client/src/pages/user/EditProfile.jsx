import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id),
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value 
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.fullName || !data.avatar){
            toast.error("All fields are mandatory")
            return;
        }

        if(data.fullName.length < 5){
            toast.error("Name can not be of less than 5 characters")
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

    return(
        <>
            <HomeLayout>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <form 
                        noValidate
                        onSubmit={onFormSubmit}
                        className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-full max-w-md min-h-[26rem] shadow-[0_0_10px_black] bg-gray-900"

                    >
                        <h1 className="text-center text-xl sm:text-2xl font-semibold">Edit profile</h1>

                        <label 
                            htmlFor="image_uploads"
                            className="cursor-pointer"
                        >
                            {
                                data.previewImage ? (
                                    <img 
                                    src={data.previewImage} 
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full m-auto object-cover" />
                                ):(
                                    <BsPersonCircle  className="w-28 h-28 rounded-full m-auto"/>
                                )
                            }
                        </label>

                        <input 
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .svg, .png"
                         />

                         <div className="flex flex-col gap-1">
                            <label 
                            htmlFor="fullName"
                            className="text-lg font-semibold">
                                Full name
                            </label>

                            <input 
                            required
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            value={data.fullName}
                            className="bg-transparent px-3 py-2 border rounded-md focus:outline-none focus:border-yellow-500 transition"
                            onChange={handleInputChange }/>
                         </div>

                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        
                            <button 
                            type="submit"
                            className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 rounded-md transition-all duration-300 font-semibold py-2 text-center">
                                    Update profile
                            </button>

                            <Link
                            to="/user/profile"
                            className="w-full sm:w-1/2 border border-yellow-600 hover:border-yellow-500 rounded-md transition-all duration-300 font-semibold py-2 text-center"
                            >
                                <button>
                                    Discard
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </HomeLayout>
        </>
    )
}

export default EditProfile;