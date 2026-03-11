import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLectures, getCourseLectures } from "../../redux/slices/LectureSlice";

const DisplayLectures = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(deleteCourseLectures({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    else dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-screen py-6 px-3 text-white flex flex-col gap-10 items-center">
        {/* Course Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-500 text-center">
          {state?.title}
        </h1>

        {/* Main Content */}
        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 lg:gap-8">
            {/* Video + Details */}
            <div className="flex flex-col gap-6 w-full lg:w-2/3 p-6 rounded-2xl bg-gradient-to-br from-yellow-900/20 via-yellow-900/10 to-black/30 backdrop-blur-md border border-gray-700 shadow-xl transition-all hover:shadow-2xl h-full">
              <div className="w-full h-96 sm:h-[22rem] md:h-[25rem] lg:h-[30rem] relative rounded-xl overflow-hidden shadow-inner">
                <video
                  src={lectures[currentVideo]?.lecture?.secure_url}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  muted
                  controlsList="nodownload"
                />
              </div>

              <div className="space-y-4">
                {/* Title Section */}
                 <div className="flex items-center gap-3">
    <span className="inline-block w-1 h-8 bg-yellow-500 rounded"></span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400">
      {lectures[currentVideo]?.title || "Untitled Lecture"}
    </h2>
  </div>

  {/* Description Section */}
  <div className="bg-white/10 p-4 rounded-xl border border-gray-700 shadow-inner">
    <p
      className={`text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed ${
        !expanded ? 'line-clamp-2' : ''
      }`}
    >
      {lectures[currentVideo]?.description || "No description available."}
    </p>

    {/* More/Less Button */}
    {lectures[currentVideo]?.description?.length > 120 && (
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-yellow-400 text-sm font-semibold hover:underline"
      >
        {expanded ? 'Less' : 'More'}
      </button>
    )}
  </div>
              </div>
            </div>

            {/* Lecture List */}
            <div className="w-full lg:w-1/3 p-6 rounded-2xl bg-gradient-to-br from-black/20 via-black/10 to-yellow-900/20 backdrop-blur-md border border-gray-700 shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">
                  Lectures
                </h3>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold text-sm sm:text-base transition"
                  >
                    Add Lecture
                  </button>
                )}
              </div>

              <ul className="space-y-3 flex-1 overflow-y-auto pr-1">
                {lectures.map((lecture, idx) => (
                  <li
                    key={lecture._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-3 rounded-lg hover:bg-yellow-900/20 transition cursor-pointer"
                  >
                    <p
                      onClick={() => setCurrentVideo(idx)}
                      className="text-sm sm:text-base text-white hover:text-yellow-400 transition flex-1"
                    >
                      {idx + 1}. {lecture?.title}
                    </p>

                    {role === "ADMIN" && (
                      <button
                        onClick={() => onLectureDelete(state._id, lecture._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-sm sm:text-base transition"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="px-6 py-3 border border-yellow-500 hover:bg-yellow-600 rounded-2xl font-semibold text-lg transition"
            >
              Add First Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;