import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../redux/slices/courseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {

    const uploadedImage = e.target.files[0];

    if (uploadedImage) {

      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = () => {

        setUserInput({
          ...userInput,
          previewImage: fileReader.result,
          thumbnail: uploadedImage
        });

      };

    }

  }

  function handleUserInput(e) {

    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value
    });

  }

  async function onFormSubmit(e) {

    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.thumbnail ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.category
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if (response?.payload?.success) {

      toast.success("Course created successfully");

      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });

      navigate("/courses");

    }

  }

  return (
    <HomeLayout>

      <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-10 py-16 text-white">

        <form
          onSubmit={onFormSubmit}
          className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-gray-800 rounded-xl p-6 sm:p-10 shadow-xl space-y-6 relative"
        >

          {/* BACK BUTTON */}

          <Link
            to="/courses"
            className="absolute left-6 top-6 text-2xl text-yellow-500 hover:scale-110 transition"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Create New <span className="text-yellow-500">Course</span>
          </h1>


          <div className="grid md:grid-cols-2 gap-8">

            {/* IMAGE UPLOAD */}

            <div>

              <label
                htmlFor="image_uploads"
                className="cursor-pointer block"
              >

                {userInput.previewImage ? (

                  <img
                    src={userInput.previewImage}
                    className="w-full h-48 object-cover rounded-lg border border-gray-700 hover:scale-105 transition"
                  />

                ) : (

                  <div className="w-full h-48 flex items-center justify-center border border-dashed border-gray-600 rounded-lg hover:border-yellow-500 transition text-center px-3">

                    <p className="font-semibold text-gray-300">
                      Click to upload course thumbnail
                    </p>

                  </div>

                )}

              </label>

              <input
                type="file"
                id="image_uploads"
                accept=".jpg,.jpeg,.png,.svg"
                className="hidden"
                onChange={handleImageUpload}
              />

            </div>


            {/* FORM INPUTS */}

            <div className="space-y-5">

              <div className="flex flex-col gap-1">

                <label className="font-semibold">
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter course title"
                  className="bg-transparent border border-gray-700 rounded-md px-3 py-2 focus:border-yellow-500 outline-none"
                  value={userInput.title}
                  onChange={handleUserInput}
                />

              </div>


              <div className="flex flex-col gap-1">

                <label className="font-semibold">
                  Instructor Name
                </label>

                <input
                  type="text"
                  name="createdBy"
                  placeholder="Enter instructor name"
                  className="bg-transparent border border-gray-700 rounded-md px-3 py-2 focus:border-yellow-500 outline-none"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />

              </div>


              <div className="flex flex-col gap-1">

                <label className="font-semibold">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="Enter course category"
                  className="bg-transparent border border-gray-700 rounded-md px-3 py-2 focus:border-yellow-500 outline-none"
                  value={userInput.category}
                  onChange={handleUserInput}
                />

              </div>


              <div className="flex flex-col gap-1">

                <label className="font-semibold">
                  Course Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter course description"
                  className="bg-transparent border border-gray-700 rounded-md px-3 py-2 h-24 resize-none focus:border-yellow-500 outline-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />

              </div>

            </div>

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-md hover:scale-105 transition duration-300"
          >
            Create Course
          </button>

        </form>

      </div>

    </HomeLayout>
  );
};

export default CreateCourse;