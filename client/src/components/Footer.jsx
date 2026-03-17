import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-950 text-gray-300 rounded-t-lg pt-10 pb-6 px-5 sm:px-10">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">LMS-E</h2>
          <p className="text-sm text-gray-400">
            Learn, build, and collaborate with real-world projects. Level up your coding journey.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">Courses</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Docs</li>
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-yellow-400 cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect with us</h3>
          <div className="flex gap-4 text-xl">
            <a className="hover:text-yellow-400 transition duration-300">
              <BsFacebook />
            </a>
            <a className="hover:text-yellow-400 transition duration-300">
              <BsInstagram />
            </a>
            <a className="hover:text-yellow-400 transition duration-300">
              <BsLinkedin />
            </a>
            <a className="hover:text-yellow-400 transition duration-300">
              <BsTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
        © {year} LMS-E. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;