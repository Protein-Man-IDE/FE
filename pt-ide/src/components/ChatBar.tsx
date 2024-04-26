// import React, { useState } from 'react';

// const ChatBar = () => {
//   const [message, setMessage] = useState('');


//   return (
//     <form className="flex items-center justify-between p-4 bg-gray-100 border-t">
//       <input
//         type="text"
//         placeholder="채팅을 입력하세요"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="flex-1 p-2 mr-4 text-gray-800 bg-white border rounded shadow-inner"
//       />
//       <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
//         <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue" viewBox="0 0 24 24">
//           <path fill-rule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clip-rule="evenodd"/>
//         </svg>
//       </button>
//     </form>
//   );
// }

// export default ChatBar;
// ChatBar.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ChatBarProps {
  roomNo: string | undefined;
}

const ChatBar: React.FC<ChatBarProps> = ({ roomNo }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        // Axios를 사용하여 메시지를 서버로 전송합니다.
        await axios.post(`http://localhost:8080/app/sendChat/${roomNo}`, {
          userNo: 1, // userNo는 현재 로그인한 사용자의 ID로 변경해야 합니다.
          chatTxt: newMessage
        });
        setNewMessage('');
      } catch (error) {
        console.error('Message sending error:', error);
        // 적절한 사용자에게 에러 메시지를 표시합니다.
      }
    }
  };

  return (
    <div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="메시지 입력..."
      />
      <button onClick={sendMessage}>보내기</button>
    </div>
  );
};

export default ChatBar;

