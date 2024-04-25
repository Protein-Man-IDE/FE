import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const posts = [
  "The function of good software is to make complex things appear simple - Grady Booch",
  "First, solve the problem. Then, write the code - John Johnson",
  "Programming isn't about what you know; it's about what you can figure out. - Chris Pine"
];

const Home: React.FC = () => {

  const [currentPost, setCurrentPost] = useState<string>(posts[0]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(0); // 글자가 사라지는 효과
      const randomIndex = Math.floor(Math.random() * posts.length);
      const randomPost = posts[randomIndex];
      setTimeout(() => {
        setCurrentPost(randomPost); // 새 글자로 업데이트
        setOpacity(1); // 글자가 서서히 나타나는 효과
      }, 1000); // 1초 후에 변경
    }, 10000); // 10초마다 반복

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className="h-[100vh] items-center justify-center bg-white dark:bg-black">
        <div className="inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50" />
        </div>
        <div className="mt-40 flex justify-center">
          <div className="flex flex-col items-center justify-center w-[800px] h-[200px] overflow-hidden">
            <div className="flex flex-col items-center justify-center" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
              <h1 className="relative text-3xl font-bold text-gray-800 dark:text-white dark:opacity-80 transition-colors">{currentPost.split('-')[0]}</h1>
              <h2 className="relative py-4 text-xl text-gray-800 dark:text-white dark:opacity-80 transition-colors">-{currentPost.split('-')[1]}</h2>
            </div>
          </div>
        </div>

        <div className="content py-20">
          <h2>A Web IDE with Live-chat</h2>
          <h2>A Web IDE with Live-chat</h2>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="py-2 px-4 border border-stone-200 rounded-full drop-shadow-sm text-sm text-stone-800 dark:text-white bg-white/40 dark:bg-black/40 backdrop-blur-lg hover:border-stone-300 transition-colors dark:border-stone-500 dark:hover:border-stone-400">
            <Link to='/login'>Sign In</Link></button>
          <button className="ml-4 py-2 px-4 border border-stone-200 rounded-full drop-shadow-sm text-sm text-stone-800 dark:text-white bg-white/40 dark:bg-black/40 backdrop-blur-lg hover:border-stone-300 transition-colors">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 font-bold"><Link to='/signup'>Sign Up for Free</Link></p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
