import React from 'react';


const Navbar = () => {
    return (
        <div className="bg-customColor p-3 flex justify-between items-center"> {/* darkMode 조건부 클래스 제거 */}
            <div className="flex items-center">
                <img
                    src=""
                    alt="로고"
                    className="object-cover w-7 h-10"
                />
                <span className="rounded-xl bg-current p-2 text-[1em] leading-none">
                    <button className="text-white dark:text-black">PT_IDE</button>
                </span>


            </div>
        </div>
    );
};

export default Navbar;
