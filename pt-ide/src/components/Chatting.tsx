import React,{useState} from 'react';
import MessageList from './MessageList';  // 메시지 리스트 컴포넌트
import ChatBar from './ChatBar';          // 입력바 컴포넌트
import ChatHeader from './ChatHeader';
import CreateRoomModal from './CreateRoomModal';
import ChatRoomList from './ChatRoomList';
//import ChatRoomList from './ChatRoomList';  

interface Room {
  id: number;
  name: string;
}// 채팅 창 컴포넌트

const Chatting: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRoom = (roomName: string) => {
    const newRoom: Room = {
      id: rooms.length + 1, // 간단한 ID 할당 방식입니다.
      name: roomName,
    };
    setRooms([...rooms, newRoom]);
    setIsModalOpen(false); // 방을 생성한 후 모달을 닫습니다.
  };

  return (
    <div>
    <ChatHeader onOpenModal={() => setIsModalOpen(true)} />
    {/* <ChatRoomList rooms={rooms} /> */}
    <CreateRoomModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onCreateRoom={handleCreateRoom}
    />
  </div>
  );
};

export default Chatting;

