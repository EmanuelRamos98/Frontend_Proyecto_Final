import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Chat from '../Componets/Chat'
import EnviarMessage from '../Componets/EnviarMessage'
import { useChat } from '../Context/ChatContext'
import './chatScreen.css'


const ChatScreen = ({ onOpenModal }) => {
    const navigate = useNavigate()
    const { selectedContacId, setSelectedContacId   } = useChat()
    const handleClickPerfil = () => {
        if (onOpenModal) {
            onOpenModal(selectedContacId)
        }
    }
    const handleBackHome = () => {
        setSelectedContacId(null)
        navigate('/home')
    }

    
    return (
        <div className='container_chat'>
            <h1 onClick={handleClickPerfil}>Chat</h1>
            <button onClick={handleBackHome}>volver</button>
            <Chat receiverId={selectedContacId} />
            <EnviarMessage receiverId={selectedContacId} />
        </div>
    )
}


export default ChatScreen