import React from 'react';
import { FaDumbbell } from 'react-icons/fa'; // FaLaptopCode 아이콘을 가져옵니다.
import DarkModeButton from './DarkModeButton';

interface IdeNavbarProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const IdeNavbar: React.FC<IdeNavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className={isDarkMode ? "bg-gray-800 text-white p-2 text-center" : "bg-purple-200 text-black p-2 text-center"}>
            <ul className="list-none p-0 flex justify-between w-full">
                <li>
                    <a href="/" className="ml-2 no-underline hover:text-gray-500 flex items-center">
                        <FaDumbbell className="mr-2" />
                        PT-IDE Editor
                    </a>
                </li>
                <div className="flex space-x-4">
                    <li>
                        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={toggleDarkMode} />
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default IdeNavbar;
