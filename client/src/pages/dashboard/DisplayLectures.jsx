import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import {
  getCourseLectures,
  deleteCourseLectures,
} from "../../redux/slices/LectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentVideo, setCurrentVideo] = useState(0);

  // 🔥 Better courseId extraction
  const courseId = state?.courseId || state?._id || state?.id;
  const courseTitle = state?.title || "Course Lectures";

  const lectureState = useSelector((state) => state.lecture) || {};
  const lectures = Array.isArray(lectureState.lectures) ? lectureState.lectures : [];
  const loading = lectureState.loading || false;
  const role = useSelector((state) => state.auth?.role);

  // Fetch Lectures
  useEffect(() => {
    if (!courseId) {
      navigate("/courses");
      return;
    }

    console.log("Fetching lectures for courseId:", courseId); // Debugging
    dispatch(getCourseLectures(courseId));
  }, [dispatch, courseId, navigate]);

  // Auto select first video
  useEffect(() => {
    if (lectures.length > 0) {
      setCurrentVideo(0);
    }
  }, [lectures]);

  const currentLecture = lectures[currentVideo] || {};

  async function onLectureDelete(e, lectureId) {
    e.stopPropagation();
    if (!window.confirm("Delete this lecture?")) return;

    await dispatch(deleteCourseLectures({ courseId, lectureId }));
    dispatch(getCourseLectures(courseId)); // Refresh list
  }

  if (loading) {
    return (
      <HomeLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading lectures...
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen py-8 px-4 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          {courseTitle}
        </h1>

        {lectures.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-xl">
            No lectures available in this course yet.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Video Player */}
            <div className="lg:w-2/3 bg-gray-900 rounded-xl p-4">
              {currentLecture?.lecture?.secure_url ? (
                <video
                  key={currentLecture.lecture.secure_url}
                  src={currentLecture.lecture.secure_url}
                  className="w-full aspect-video rounded-lg"
                  controls
                  controlsList="nodownload"
                />
              ) : (
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <p>No video available</p>
                </div>
              )}

              <h2 className="text-xl font-semibold mt-4">{currentLecture?.title}</h2>
              <p className="text-gray-300 mt-2">{currentLecture?.description}</p>
            </div>

            {/* Lecture List */}
            <div className="lg:w-1/3 bg-gray-900 rounded-xl p-4">
              <h3 className="font-semibold mb-4">Lectures ({lectures.length})</h3>

              <div className="max-h-[70vh] overflow-y-auto space-y-2 pr-2">
                {lectures.map((lec, idx) => (
                  <div
                    key={lec._id}
                    onClick={() => setCurrentVideo(idx)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      idx === currentVideo ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="flex-1">
                        {idx + 1}. {lec.title}
                      </span>
                      {role === "ADMIN" && (
                        <button
                          onClick={(e) => onLectureDelete(e, lec._id)}
                          className="text-red-500 hover:text-red-600 text-sm px-2 py-1 rounded hover:bg-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;