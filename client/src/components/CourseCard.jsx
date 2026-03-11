import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="text-white w-[22rem] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-800 hover:scale-105 transition-transform duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt={data?.title || "Course Thumbnail"}
          className="h-48 w-full rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data?.title}
          </h2>

          <p className="text-gray-300 text-sm line-clamp-2">
            {data?.description || "No description available."}
          </p>

          <p className="text-sm font-semibold">
            <span className="text-yellow-500 font-bold">Category: </span>
            {data?.category || "N/A"}
          </p>

          <p className="text-sm font-semibold">
            <span className="text-yellow-500 font-bold">Total lectures: </span>
            {data?.numberOfLectures ?? 0}
          </p>

          <p className="text-sm font-semibold">
            <span className="text-yellow-500 font-bold">Instructor: </span>
            {data?.createdBy || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;