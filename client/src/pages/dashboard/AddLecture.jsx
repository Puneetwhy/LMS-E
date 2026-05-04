import { useLocation, useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../redux/slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // 🔥 fallback support

  const courseDetails = location.state;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userInput, setUserInput] = useState({
    id: "",
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  // 🔥 SAFE INIT (Render + refresh safe)
  useEffect(() => {
    const courseId = courseDetails?._id || id;

    if (!courseId) {
      navigate("/courses");
      return;
    }

    setUserInput((prev) => ({
      ...prev,
      id: courseId,
    }));
  }, [courseDetails, id, navigate]);

  // 🔥 CLEANUP (memory leak fix)
  useEffect(() => {
    return () => {
      if (userInput.videoSrc) {
        URL.revokeObjectURL(userInput.videoSrc);
      }
    };
  }, [userInput.videoSrc]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🔥 VIDEO HANDLER (safe)
  function handleVideo(e) {
    const video = e.target.files?.[0];

    if (!video) return;

    // 🔴 FILE VALIDATION
    if (video.size > 50 * 1024 * 1024) {
      toast.error("Video size should be less than 50MB");
      return;
    }

    if (!video.type.startsWith("video/")) {
      toast.error("Only video files are allowed");
      return;
    }

    const source = URL.createObjectURL(video);

    setUserInput((prev) => ({
      ...prev,
      lecture: video,
      videoSrc: source,
    }));
  }

  // 🔥 SUBMIT HANDLER
  async function onFormSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!userInput.id) {
      toast.error("Course ID missing");
      return;
    }

    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await dispatch(addCourseLectures(userInput));

      if (response?.payload?.success) {
        toast.success("Lecture added");

        setUserInput((prev) => ({
          ...prev,
          lecture: undefined,
          title: "",
          description: "",
          videoSrc: "",
        }));

        navigate("/course/displaylectures", {
          state: { courseId: userInput.id },
        });
      } else {
        toast.error(response?.payload?.message || "Failed to add lecture");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
          
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 text-2xl text-yellow-500 hover:scale-110 transition-transform"
            >
              <AiOutlineArrowLeft />
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-center text-yellow-400">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-4">

            <input
              type="text"
              name="title"
              placeholder="Enter lecture title"
              onChange={handleInputChange}
              value={userInput.title}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />

            <textarea
              name="description"
              placeholder="Enter lecture description"
              onChange={handleInputChange}
              value={userInput.description}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 resize-none h-28 focus:outline-none focus:border-yellow-500"
            />

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                className="w-full max-h-64 rounded-lg border border-gray-600 object-contain"
              />
            ) : (
              <label
                htmlFor="lecture"
                className="w-full h-40 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500"
              >
                <p className="text-gray-300 font-semibold">
                  Click to upload lecture video
                </p>

                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/*"
                  className="hidden"
                />
              </label>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Lecture"}
            </button>

          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;