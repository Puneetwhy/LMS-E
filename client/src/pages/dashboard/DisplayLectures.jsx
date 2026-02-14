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
      <div className="min-h-[100vh] flex flex-col gap-10 items-center justify-center py-10 mx-5 text-white">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </div>

        {(lectures && lectures.length > 0) ? 
        (<div className="flex justify-center gap-10 w-full">
          {/* left section for playing videos and displaying course details to admin*/}
          <div className="space-y-5 w-1/3 h-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">

            <video 
              src={state && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-t-lg w-full h-full"
              controls
              muted
              controlsList="nodownload"
              >
            </video>

            <div>
              <h1 className="text-xl font-bold text-yellow-500">
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

          <ul className="w-1/4 p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl flex justify-center text-yellow-500">
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
                        className="cursor-pointer">
                          <span>
                            {" "} lecture {idx + 1} : {" "}
                          </span>
                          {lecture?.title}
                      </p>

                      {role==='ADMIN' && (
                        <button 
                          onClick={() => onLectureDelete(state?._id, lecture?._id)}
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
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
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                  Add new lecture
                </button>
          )
        )}
      </div>
    </HomeLayout>
  )
}

export default DisplayLectures
