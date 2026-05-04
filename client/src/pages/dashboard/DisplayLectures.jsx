import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLectures
} from "../../redux/slices/LectureSlice";

const DisplayLectures = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { courseId } = useParams();

  const { lectures = [] } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // FETCH
  useEffect(() => {
    const id = state?._id || courseId;

    if (!id) {
      navigate("/courses");
      return;
    }

    dispatch(getCourseLectures(id));
  }, [dispatch, state, courseId]);

  // RESET VIDEO
  useEffect(() => {
    if (lectures.length > 0) {
      setCurrentVideo(0);
    }
  }, [lectures]);

  // DELETE (SAFE + UX)
  async function onLectureDelete(e, courseId, lectureId) {
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this lecture?");
    if (!confirmDelete) return;

    await dispatch(deleteCourseLectures({ courseId, lectureId }));
    dispatch(getCourseLectures(courseId));
  }

  const currentLecture =
    lectures.length > 0 ? lectures[currentVideo] : null;

  return (
    <HomeLayout>
      <div className="min-h-screen py-6 px-3 text-white flex flex-col gap-8 items-center">

        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          {state?.title || "Course Lectures"}
        </h1>

        {lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">

            <div className="w-full lg:w-2/3 p-4 bg-gray-900 rounded-xl shadow-xl">

              {currentLecture?.lecture?.secure_url ? (
                <video
                  key={currentLecture?.lecture?.secure_url}
                  src={currentLecture.lecture.secure_url}
                  className="w-full h-96 object-cover rounded-lg border border-gray-700"
                  controls
                  controlsList="nodownload"
                />
              ) : (
                <p className="text-center text-gray-400">
                  No video available
                </p>
              )}

              <h2 className="text-xl mt-4 font-semibold">
                {currentLecture?.title}
              </h2>

              <p
                className={`text-gray-300 mt-2 ${
                  !expanded ? "line-clamp-2" : ""
                }`}
              >
                {currentLecture?.description}
              </p>

              {currentLecture?.description?.length > 100 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-yellow-400 mt-2 text-sm hover:underline"
                >
                  {expanded ? "Show Less" : "Read More"}
                </button>
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-gray-900 p-4 rounded-xl shadow-xl">

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Lectures</h3>

                {role === "ADMIN" && (
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
                    onClick={() =>
                      navigate("/course/addlecture", {
                        state: { ...state, _id: courseId || state?._id }
                      })
                    }
                  >
                    + Add
                  </button>
                )}
              </div>

              <ul className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">

                {lectures.map((lec, idx) => (
                  <li
                    key={lec._id}
                    onClick={() => setCurrentVideo(idx)}
                    className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                      idx === currentVideo
                        ? "bg-yellow-500 text-black font-medium"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <p className="flex-1 text-sm truncate">
                      {idx + 1}. {lec.title}
                    </p>

                    {role === "ADMIN" && (
                      <button
                        onClick={(e) =>
                          onLectureDelete(
                            e,
                            courseId || state?._id,
                            lec._id
                          )
                        }
                        className="ml-2 text-red-400 text-xs px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
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
          <p className="text-gray-400">No lectures found</p>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;