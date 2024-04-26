import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import ChatRoomList from "./ChatRoomList";
import {ChatRoom} from "./ChatRoom";



const Chatting: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const fetchChatRooms = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      const response = await axios.get<{ success: boolean; message: string; data: ChatRoom[] }>('http://localhost:8080/chat/rooms', {
        headers: {
          'Authorization': `${token}`
        }
      });
  
      if (response.data.success) {
        setChatRooms(response.data.data);
      } else {
        console.error('Failed to fetch chat rooms:', response.data.message);
        // Handle non-successful response
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          alert('접근 권한이 없습니다. 로그인 상태를 확인해주세요.');
        } else {
          console.error('An error occurred while fetching the chat rooms:', error.response.data);
          // Handle other responses
        }
      } else {
        console.error('An error occurred:', error);
        // Handle non-Axios error
      }
    }
  };
  

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const addChatRoom = (newRoom: ChatRoom) => {
    setChatRooms(prevRooms => [...prevRooms, newRoom]);
  };

  return (
    <div>
      <ChatHeader onRoomAdded={addChatRoom} />
      <ChatRoomList chatRooms={chatRooms} />
    </div>
  );
};

export default Chatting;
