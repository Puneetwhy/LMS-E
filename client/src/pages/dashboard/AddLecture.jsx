import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../redux/slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const location = useLocation();
  const courseDetails = location.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: "",
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
      return;
    }

    setUserInput((prev) => ({
      ...prev,
      id: courseDetails._id,
    }));
  }, [courseDetails]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleVideo(e) {
    const video = e.target.files[0];

    if (!video) return;

    const source = URL.createObjectURL(video);

    setUserInput((prev) => ({
      ...prev,
      lecture: video,
      videoSrc: source,
    }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.id) {
      toast.error("Course ID missing");
      return;
    }

    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(addCourseLectures(userInput));

    if (response?.payload?.success) {
      toast.success("Lecture added");

      // 🔥 RESET
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });

      navigate(`/course/displaylectures/${courseDetails._id}`);
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

            {/* TITLE */}
            <input
              type="text"
              name="title"
              placeholder="Enter lecture title"
              onChange={handleInputChange}
              value={userInput.title}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Enter lecture description"
              onChange={handleInputChange}
              value={userInput.description}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 resize-none h-28 focus:outline-none focus:border-yellow-500"
            />

            {/* VIDEO */}
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

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:scale-105"
            >
              Add Lecture
            </button>

          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;