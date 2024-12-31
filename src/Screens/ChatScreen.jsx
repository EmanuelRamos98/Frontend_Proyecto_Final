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
    const [opneMobilModal, setOpneMobilModal] = useState(false) //Estado para mostrar el modal en dispositivos moviles
    const { isMobile } = useScreenSize() //Detecta si es un dispositivo movil
    const { contactos } = useContact() //Obtenemos los contactos del Hook
    const { selectedContacId, setSelectedContacId } = useChat() //Obtenemos el contacto selecionado del contexto y su seter
    const navigate = useNavigate() //Hook de navegacion

    //Busco el contacto actualmente seleccionado
    const selectedContact = contactos.find(contact => contact.id === selectedContacId)

    //Abre el perfil del contacto en el modal
    const handleClickPerfil = () => {
        if (onOpenModal) {
            onOpenModal(selectedContacId)
        }
    }

    //Vuelve al Home y deselecciona el contacto
    const handleBackHome = () => {
        setSelectedContacId(null)
        navigate('/home')
    }

    //Abre el modal en caso movil
    const handleOpenMobileModal = () => {
        setOpneMobilModal(true)
    }

    //Cierra el modal en caso movil
    const handleCloseModal = () => {
        setOpneMobilModal(false)
    }

    //Maneja el click en el encabezado del chat
    //Abre el perfil del contacto segun el dispositivo en el que se este ejecutando
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

            {/* Componente del chat y envio de mensajes */}
            {selectedContacId && <Chat receiverId={selectedContacId} />}
            <EnviarMessage receiverId={selectedContacId} />
            
            {/* Modal en version mobil */}
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