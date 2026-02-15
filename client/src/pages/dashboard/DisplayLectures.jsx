import { useEffect } from "react"
import HomeLayout from "../../layouts/HomeLayout"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLectures, getCourseLectures } from "../../redux/slices/LectureSlice";
import { useState } from "react";

const DisplayLectures = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();

  const {lectures} = useSelector((state) => state.lecture);
  const {role} = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId){
    await dispatch(deleteCourseLectures({courseId: courseId, lectureId: lectureId}))
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if(!state){
      navigate('/courses')
    }

    dispatch(getCourseLectures(state._id))
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col gap-8 items-center py-10 px-4 sm:px-6 text-white">
        <div className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </div>

        {(lectures && lectures.length > 0) ? 
        (<div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-7xl">
          {/* left section for playing videos and displaying course details to admin*/}
          <div className="space-y-5 w-full lg:w-2/3 p-4 rounded-lg shadow-[0_0_10px_black]">

            <video 
              src={state && lectures[currentVideo]?.lecture?.secure_url}
              className="rounded-lg w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] object-cover"
              controls
              muted
              controlsList="nodownload"
              >
            </video>

            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">
                <span className="text-gray-400 font-semibold text-xl">
                   Title : {" "}  
                </span>
                {lectures && lectures[currentVideo]?.title}
              </h1>

              <p className="text-yellow-200">
                <span className="text-gray-400 font-semibold text-xl">
                   Description : {" "}  
                </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying list of lectures*/}

          <ul className="w-full lg:w-1/3 p-4 rounded-lg shadow-[0_0_10px_black] space-y-4 max-h-[500px] overflow-y-auto">
            <li className="font-semibold text-lg sm:text-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-yellow-500">
              <p>Lectures list</p>
              {role==='ADMIN' && (
                <button 
                  onClick={() => navigate('/course/addlecture', {state : {...state}})}
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                  Add new lecture
                </button>
              )}
            </li>

            {lectures && 
              lectures.map((lecture, idx) => {
                return(
                  <li 
                    className="space-y-2"
                    key={lecture._id}>

                      <p 
                        onClick={() => setCurrentVideo(idx)}
                        className="cursor-pointer text-sm sm:text-base hover:text-yellow-400 transition">
                          <span>
                            {" "} lecture {idx + 1} : {" "}
                          </span>
                          {lecture?.title}
                      </p>

                      {role==='ADMIN' && (
                        <button 
                          onClick={() => onLectureDelete(state?._id, lecture?._id)}
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm w-fit">
                          Delete lecture
                        </button>
                      )}
                    
                  </li>
                )
              })
            }
          </ul>
        </div>): (
          role && role==='ADMIN' && (
                <button 
                  onClick={() => navigate('/course/addlecture', {state : {...state}})}
                  className="btn-primary px-4 py-2 rounded-md font-semibold text-sm sm:text-base w-fit mx-auto">
                  Add new lecture
                </button>
          )
        )}
      </div>
    </HomeLayout>
  )
}

export default DisplayLectures
