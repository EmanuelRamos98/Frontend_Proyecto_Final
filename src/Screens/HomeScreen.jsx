import React, { useEffect, useState } from 'react'
import { GetContacts, ModalProfileContac, MostrarUsers, Navbar } from '../Componets'
import './homeScreen.css'
import ChatScreen from './ChatScreen'
import { useChat } from '../Context/ChatContext'
import ContactProfileScreen from './ContactProfileScreen'
import UpdateMyProfileScreen from './UpdateMyProfileScreen'
import { FaArrowLeft } from "react-icons/fa6"
import { GiPadlock } from 'react-icons/gi'
import { useScreenSize } from '../Hooks'
import { useLocation, useNavigate } from 'react-router-dom'


//Componenete Home
const HomeScreen = () => {
    //Hooks de estado para manejar las diferentes vistas y modal
    const [mostrar, setMostrar] = useState(false) //Controla si muestra la lista usuarios o de contactos
    const { selectedContacId } = useChat() //El ID del contacto seleccionado
    const [modalOpen, setModalOpen] = useState(false) //Controla el modal
    const [modalContacId, setModalContacId] = useState(null) //ID del contacto a mostrar en el modal
    const [userProfile, setUserProfile] = useState(false) //Mostrar el perfil del usuario en el modal
    const [editProfile, setEditProfile] = useState(false) //Mostrar el editor del perfil
    const navigate = useNavigate() //Hook para navegar
    const { isMobile } = useScreenSize() //Detecta si es mobil o no
    const location = useLocation() //Obtiene la ubicacion actual de la app

    //Abre el perfil del usuario en el modal
    const handleOpenUserProfile = () => {
        setUserProfile(true)
        setModalOpen(true)
        setEditProfile(false)
    }

    //Abre un modal para mostrar en el modal el perfil de un contacto
    const handleOpenModal = (contactId) => {
        setModalContacId(contactId)
        setUserProfile(false)
        setModalOpen(true)
        setEditProfile(false)
    }

    //Cierra cualquier modal abierto y restablece los estados
    const handleCloseModal = () => {
        setModalOpen(false)
        setModalContacId(null)
        setUserProfile(false)
        setEditProfile(false)
    }

    //Activa el editor del perfil
    const handleEditProfile = () => {
        setEditProfile(true)
    }

    //Alterna si muestra usuarios o los contactos
    const handleCkick = () => {
        setMostrar((prevState) => !prevState)
    }

    //Navega automaticamente al chat seleccionado si estamos en dispositivos moviles 
    React.useEffect(() => {
        if (isMobile && selectedContacId && location.pathname !== `/chat/${selectedContacId}`) {
            navigate(`/chat/${selectedContacId}`)

        }
    }, [isMobile, selectedContacId, navigate, location.pathnam])

    return (
        <div className='body_home'>
            <div className='container_home'>
                {/* Barra de navegacion con la funcion para abrir el perfil del usuario*/}
                <Navbar handleOpenUserProfile={handleOpenUserProfile} />
                <div className='container_nav_home'>
                    <div className='tilte_container_home'>
                        {
                            mostrar ?
                                <>
                                    <p className='title_home'>Lista de usuarios</p>
                                    <button
                                        onClick={handleCkick}
                                        className='btn_lista_user'>
                                        <FaArrowLeft />
                                    </button>
                                </>
                                :
                                <>
                                    <p className='title_home'>Chats</p>
                                    <button
                                        onClick={handleCkick}
                                        className='btn_lista_user'>
                                        Agregar
                                    </button>
                                </>
                        }
                    </div>
                    {/* Muestra la lista de ususarios o los contactos segun el estado */}
                    {mostrar
                        ?
                        <span className='container_contact_home'> <MostrarUsers /> </span>
                        :
                        <span className='container_contact_home'><GetContacts /></span>
                    }
                </div>

                <div className='chat_container_home'>
                    {/* Muestra la pantalla del chat si hay un contacto selecionado */}
                    {!isMobile && selectedContacId && (
                        <ChatScreen key={selectedContacId} onOpenModal={handleOpenModal} />
                    )}
                    {/* Muestra un mensaje predeterminado si no hay chat seleccionado */}
                    {!isMobile && !selectedContacId && (<div className='text_no_chat_container'>
                        <img src="\Assets\Gente-chateando-no-chat.jpg" alt="no_chat_img" className='no_chat_img' />
                        <p className='text_no_chat'>Comineza a chatera con tus amigos y familiares, que esperas?</p>
                        <p className='text_no_chat'>
                            <GiPadlock className='icon_no_chat' />
                            Tus mensajes personales estan cifrados de extremo a extremo
                        </p>
                    </div>
                    )}
                </div>

                {/* Modal para perfiles o edicion del perdil de ususario */}
                <ModalProfileContac isOpen={modalOpen} onClose={handleCloseModal}>
                    {
                        editProfile && <UpdateMyProfileScreen /> //Para editar perfil
                        ||
                        userProfile && <ContactProfileScreen userProfile={userProfile} onEdit={handleEditProfile} /> //Perfil del ususario
                        ||
                        modalContacId && <ContactProfileScreen /> //Perfil del contacto
                    }
                </ModalProfileContac>
            </div>
        </div>
    )
}

export default HomeScreen

