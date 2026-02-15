import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] relative">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-white tracking-widest">
            404
        </h1>

        <div className="bg-black text-white px-3 py-1 text-xs sm:text-sm rounded rotate-12 absolute top-1/3">
            Page not found ...
        </div>

        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
            <span onClick={() => navigate(-1)} className="relative block px-6 sm:px-8 py-2 sm:py-3 bg-[#1A2238] border border-current">
                Go Back
            </span>
            </a>
        </button>
   </div>

);
}

export default NotFound
