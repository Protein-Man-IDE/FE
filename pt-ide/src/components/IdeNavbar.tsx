import React from 'react';
import DarkModeButton from './DarkModeButton';

interface IdeNavbarProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const IdeNavbar: React.FC<IdeNavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className="bg-purple-200 text-white p-2 text-center">
            <ul className="list-none p-0 flex justify-between w-full">
                <li>
                    <a href="/home" className="no-underline hover:text-gray-300">PT-IDE Editor</a>
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
