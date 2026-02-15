import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../layouts/HomeLayout"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../redux/slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {

    const courseDetails = useLocation().state;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:"",
    });

    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    function handleVideo(){
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source,
        })
    }

    async function onFormSubmit(){
        e.preventDefault();

        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(addCourseLectures(userInput));

        if(response?.payload?.success){
            setUserInput({
                id:courseDetails?._id,
                lecture:undefined,
                title:"",
                description:"",
                videoSrc:"",
            })
            navigate(-1);
        }
    }

    useEffect(() => {
        if(!courseDetails){
            navigate('/courses')
        }
    }, [])

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex items-center justify-center flex-col gap-8 sm:gap-10 px-4 sm:px-8">
        <div className="flex flex-col gap-5 p-4 sm:p-6 shadow-[0_0_10px_black] w-full max-w-[600px] rounded-lg">
            <header className="flex items-center justify-center relative">
                <button 
                onClick={() => navigate(-1)}
                className="absolute left-2 text-xl text-green-500">
                    <AiOutlineArrowLeft />
                </button>
                <h1 className="text-lg sm:text-xl text-yellow-500 font-semibold text-center">
                    Add new lecture
                </h1>
            </header>

            <form 
            onSubmit={onFormSubmit}
            className="flex flex-col gap-3">

                <input type="text" 
                name="title"
                placeholder="Enter the title of the lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-2 border text-sm sm:text-base"
                value={userInput.title}/>

                <textarea type="text" 
                name="description"
                placeholder="Enter the description of the lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-2 border resize-none overflow-y-auto h-24 sm:h-28 text-sm sm:text-base"
                value={userInput.description}/>
                
                {userInput.videoSrc ? (
                    <video 
                    muted 
                    src={userInput.videoSrc} 
                    controls
                    controlsList="nodownload nofullscreen"
                    disablePictureInPicture
                    className="object-contain rounded-lg w-full max-h-64">

                    </video>
                ) : (
                    <div className="h-40 sm:h-48 flex items-center justify-center cursor-pointer text-center px-2">
                        <label  className="font-semibold text-base sm:text-xl cursor-pointer" htmlFor="lecture">Choose your video</label>
                        <input type="file" className="hidden" id="lecture" name='lecture' onChange={handleVideo} accept="video/mp4 video/x-mp4" />
                    </div>
                )}

                <button type="submit" className="btn btn-primary py-2 font-semibold text-base sm:text-lg w-full">
                    Add new lecture
                </button>
            </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AddLecture
