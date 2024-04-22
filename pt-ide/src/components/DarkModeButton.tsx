import React from 'react';

const DarkModeButton = ({ isDarkMode, setIsDarkMode }) => {
    const toggleButton = () => {
        setIsDarkMode(!isDarkMode); // Toggle the dark mode state
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={toggleButton}
                className={`w-7 h-7 rounded-full shadow-lg cursor-pointer text-lg relative transition-all duration-1000 ${isDarkMode ? 'bg-[var(--main-color)]' : 'bg-white'}`}
                style={{ boxShadow: '0 0 16px 3px rgba(0, 0, 0, 0.15)' }}
            >
                <span className="absolute bottom-0 left-0 right-0 top-1">{isDarkMode ? '🌙' : '☀️'}</span>
            </button>
        </div>
    );
};

export default DarkModeButton;
