import React,{useState} from 'react';


interface CreateRoomModalProps {
  isOpen: boolean; // 모달의 열림 상태
  onClose: () => void; // 모달을 닫는 함수
}

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string) => void; // onCreateRoom 함수 타입을 추가합니다.
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreateRoom }) => {
  
  const [roomName, setRoomName] = useState('');

  // 모달의 보여주기/숨기기 처리를 합니다.
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              새 채팅방 만들기
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <form className="space-y-6 p-6">
            <input
              type="text"
              name="chatRoomName"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="채팅방 이름 입력하기"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                방 생성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
