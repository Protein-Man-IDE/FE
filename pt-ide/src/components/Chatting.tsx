import React, {useState} from "react";
import ChatHeader from "./ChatHeader";


const Chatting = () =>{
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
    console.log("Modal opened");
  }
  const handleCloseModal = () => setModalOpen(false);

  return(
    <div>
      <ChatHeader/>
    </div>
  )
}

export default Chatting;
