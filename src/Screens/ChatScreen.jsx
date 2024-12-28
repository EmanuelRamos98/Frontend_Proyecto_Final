import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Chat from '../Componets/Chat'
import EnviarMessage from '../Componets/EnviarMessage'
import { useChat } from '../Context/ChatContext'
import { useContact, useScreenSize } from '../Hooks'
import { FaArrowLeft } from 'react-icons/fa6'
import { ModalProfileContac } from '../Componets'
import ContactProfileScreen from './ContactProfileScreen'
import './chatScreen.css'


const ChatScreen = ({ onOpenModal }) => {
    const [opneMobilModal, setOpneMobilModal] = useState(false)
    const { isMobile } = useScreenSize()
    const { contactos, loading_contactos, error_contactos } = useContact()
    const { selectedContacId, setSelectedContacId } = useChat()
    const navigate = useNavigate()

    const selectedContact = contactos.find(contact => contact.id === selectedContacId)

    const handleClickPerfil = () => {
        if (onOpenModal) {
            onOpenModal(selectedContacId)
        }
    }


    const handleBackHome = () => {
        setSelectedContacId(null)
        navigate('/home')
    }

    const handleOpenMobileModal = () => {
        setOpneMobilModal(true)
    }
    const handleCloseModal = () => {
        setOpneMobilModal(false)
    }

    const handleClick = () => {
        if (isMobile) {
            handleOpenMobileModal()
        } else {
            handleClickPerfil()
        }
    }


    return (
        <div className='container_chat' >

            <div className='container_header_chat'>
                {
                    selectedContact &&
                    <div onClick={handleClick}
                        className='header_chat'>

                        <button onClick={handleBackHome} className='btn_back_header_chat'> <FaArrowLeft /></button>


                        {
                            selectedContact.image ?
                                <img src={selectedContact.image} alt="avatar" className='header_chat_img' />
                                : <img src="/Assets/Avatar.png" alt="avatar" className='header_chat_img' />
                        }

                        <div className='container_contact_info_header'>
                            <h2 className='header_chat_name'>{selectedContact.name}</h2>
                            <p className='header_chat_estado'>{selectedContact.estado}</p>
                        </div>
                    </div>
                }
            </div>
            {selectedContacId && <Chat receiverId={selectedContacId} />}
            <EnviarMessage receiverId={selectedContacId} />

            {
                isMobile && opneMobilModal && (
                    <ModalProfileContac isOpen={handleOpenMobileModal} onClose={handleCloseModal}>
                        {opneMobilModal && <ContactProfileScreen />}
                    </ModalProfileContac>
                )
            }
        </div>
    )
}


export default ChatScreen