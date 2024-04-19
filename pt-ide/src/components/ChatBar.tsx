import React, { useState } from 'react';

const ChatBar = () => {
  const [message, setMessage] = useState('');


  return (
    <form className="flex items-center justify-between p-4 bg-gray-100 border-t">
      <input
        type="text"
        placeholder="채팅을 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 mr-4 text-gray-800 bg-white border rounded shadow-inner"
      />
      <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clip-rule="evenodd"/>
        </svg>
      </button>
    </form>
  );
}

export default ChatBar;
