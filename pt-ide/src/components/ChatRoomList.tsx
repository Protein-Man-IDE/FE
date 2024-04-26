import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoom } from "./ChatRoom"; // ChatRoom 타입을 임포트합니다.

interface ChatRoomListProps {
  chatRooms: ChatRoom[]; // 외부로부터 받는 chatRooms prop의 타입을 정의합니다.
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms }) => { // Props를 컴포넌트에 전달합니다.
  const navigate = useNavigate();

  const goChat = (roomNo: number) => {
    navigate(`/chat/${roomNo}`); // 채팅방 상세 페이지로 이동
  };

  return (
    <div>
      <h1>채팅방 목록</h1>
      <ul>
        {chatRooms.map((room: ChatRoom) => (
          <li key={room.roomNo} onClick={() => goChat(room.roomNo)}>
            {room.roomName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;