import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../redux/slices/courseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title:"",
        category:"",
        createdBy: "",
        discription: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    previewImage : this.result,
                    thumbnail: uploadedImage 
                })
            })
        }
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value,
        })
    }

    async function onFormSubmit (e){
        e.preventDefault();

        if(!userInput.title || !userInput.thumbnail || !userInput.discription || !userInput.createdBy || !userInput.previewImage || !userInput.category){
            toast.error("All fields are mandatory")
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title:"",
                category:"",
                createdBy: "",
                discription: "",
                thumbnail: null,
                previewImage: "",
            })
        }
        navigate("/courses");
    }

  return (
    <>
        <HomeLayout>
            <div className="h-[100vh] flex items-center justify-center">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
                        <Link className="absolute top-8 text-2xl text-accent cursor-pointer">
                            <AiOutlineArrowLeft />
                        </Link>
                        <h1 className="text-xl text-white font-bold text-center">Create new course</h1>

                        <main className="grid grid-col-2 gap-x-10">
                            <div className="gap-y-6">
                                <div>
                                    <label htmlFor="image_uploads" className="cursor-pointer">
                                        {userInput.previewImage ? (
                                            <img className="w-full h-44 m-auto border" src={userInput.previewImage} alt="" />
                                        ) : (
                                            <div className="w-full h-44 m-auto flex items-center justify-center border" >
                                                <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                            </div>
                                        )}
                                    </label>

                                    <input 
                                        type="file"
                                        className="hidden"
                                        id="image_uploads"
                                        accept=".jpg, .jpeg, .svg, .png"
                                        name="image_uploads"/>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-lg font-semibold ">
                                        Course title
                                    </label>

                                    <input 
                                        required
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter your course title"
                                        className="bg-transparent px-2 py-1 border"
                                        value={userInput.title}
                                        onChange={handleUserInput}
                                     />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="createdBy" className="text-lg font-semibold ">
                                        Course Intructor
                                    </label>

                                    <input 
                                        required
                                        type="text"
                                        name="createdBy"
                                        id="createdBy"
                                        placeholder="Enter course instructor's name"
                                        className="bg-transparent px-2 py-1 border"
                                        value={userInput.createdBy}
                                        onChange={handleUserInput}
                                     />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="category" className="text-lg font-semibold ">
                                        Course category
                                    </label>

                                    <input 
                                        required
                                        type="text"
                                        name="category"
                                        id="category"
                                        placeholder="Enter course category"
                                        className="bg-transparent px-2 py-1 border"
                                        value={userInput.category}
                                        onChange={handleUserInput}
                                     />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="discription" className="text-lg font-semibold ">
                                        Course discription
                                    </label>

                                    <textarea
                                        
                                        required
                                        type="text"
                                        name="discription"
                                        id="discription"
                                        placeholder="Enter course discription"
                                        className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                        value={userInput.discription}
                                        onChange={handleUserInput}
                                     />
                                </div>
                            </div>
                        </main>

                        <button type="submit" className=" w-full cursor-pointer font-semibold text-lg py-2  bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md">
                            Create course
                        </button>

                </form>
            </div>
        </HomeLayout>
    </>
  )
}

export default CreateCourse
