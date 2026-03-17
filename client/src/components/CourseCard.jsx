import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="w-full max-w-[22rem] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg 
                 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt={data?.title || "Course Thumbnail"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 text-white w-full min-w-0 overflow-hidden">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-yellow-400 w-full truncate">
          {data?.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm w-full overflow-hidden line-clamp-2 break-words">
          {data?.description || "No description available."}
        </p>

        <div className="border-t border-zinc-700 my-2"></div>

        {/* Info */}
        <div className="text-sm space-y-2 w-full">
          
          <div className="flex w-full items-center gap-2 min-w-0">
            <span className="text-gray-400 shrink-0">Category:</span>
            <span className="text-white truncate min-w-0">
              {data?.category || "N/A"}
            </span>
          </div>

          <div className="flex w-full items-center gap-2 min-w-0">
            <span className="text-gray-400 shrink-0">Lectures:</span>
            <span className="text-white">
              {data?.numberOfLectures ?? 0}
            </span>
          </div>

          <div className="flex w-full items-center gap-2 min-w-0">
            <span className="text-gray-400 shrink-0">Instructor:</span>
            <span className="text-white truncate min-w-0">
              {data?.createdBy || "N/A"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;