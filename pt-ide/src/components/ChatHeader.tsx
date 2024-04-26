import React, { useState } from 'react';
import axios from 'axios';
import {ChatRoom} from "./ChatRoom";


interface ChatHeaderProps {
  onRoomAdded: (newRoom: ChatRoom) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onRoomAdded }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.post<{success: boolean; data: ChatRoom}>('http://localhost:8080/chat/rooms', { roomName },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        if (response.data.success) {
          onRoomAdded(response.data.data);
          handleCloseModal();
        } else {
          console.error('Failed to create room:', response.data);
        }
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  };

  return(
    <div className="flex flex-row items-center justify-end">  
      <div className='mr-4 cursor-pointer' onClick={handleOpenModal}>
        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div className='mr-4 cursor-pointer'>
        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      {isModalOpen && (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 overflow-y-auto z-50 justify-center items-center w-full h-full">
          <div className="relative p-4 w-full max-w-md mx-auto mt-20">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  새 채팅방 만들기
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleCreateRoom}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">채팅방 이름</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name"
                      value={roomName}
                      onChange={handleRoomNameChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="" 
                      required />
                  </div>
                  <button type="submit" className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    방 생성
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    
    
  )
}

export default ChatHeader;