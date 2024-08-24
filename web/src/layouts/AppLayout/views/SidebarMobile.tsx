import { FaPlus } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';

const SidebarMobile = () => {
  return (
    <div className="w-screen h-16 fixed bottom-0 left-0 z-10 bg-black text-white md:hidden sm:block">
      <div className="w-full h-full px-10 flex justify-between items-center">
        <div>
          <IoNewspaperOutline className="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:text-gray-900" />
        </div>
        <div>
          <svg
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </div>
        <div>
          <FaPlus size={20} />
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
