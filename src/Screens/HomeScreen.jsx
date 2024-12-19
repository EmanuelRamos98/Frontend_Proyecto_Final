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



const HomeScreen = () => {
    const [mostrar, setMostrar] = useState(false)
    const { selectedContacId } = useChat()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContacId, setModalContacId] = useState(null)
    const [userProfile, setUserProfile] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const navigate = useNavigate()
    const { isMobile } = useScreenSize()
    const location = useLocation()


    const handleOpenUserProfile = () => {
        setUserProfile(true)
        setModalOpen(true)
        setEditProfile(false)
    }

    const handleOpenModal = (contactId) => {
        setModalContacId(contactId)
        setUserProfile(false)
        setModalOpen(true)
        setEditProfile(false)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setModalContacId(null)
        setUserProfile(false)
        setEditProfile(false)
    }

    const handleEditProfile = () => {
        setEditProfile(true)
    }

    const handleCkick = () => {
        setMostrar((prevState) => !prevState)
    }

    React.useEffect(() => {
        if (isMobile && selectedContacId) {
            if (!location.pathname.includes(`/chat/${selectedContacId}`)) {
                navigate(`/chat/${selectedContacId}`)
            }
        }
    }, [isMobile, selectedContacId, navigate, location.pathname])

    return (
        <div className='container_home'>
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
                {mostrar
                    ?
                    <span className='container_contact_home'> <MostrarUsers /> </span>
                    :
                    <span className='container_contact_home'><GetContacts /></span>
                }
            </div>

            <div className='chat_container_home'>
                {!isMobile && (
                    selectedContacId ?
                        <ChatScreen key={selectedContacId} onOpenModal={handleOpenModal} />
                        : <div className='text_no_chat_container'>
                            <img src="\Assets\Gente-chateando-no-chat.jpg" alt="no_chat_img" className='no_chat_img' />
                            <p className='text_no_chat'>Comineza a chatera con tus amigos y familiares, que esperas?</p>
                            <p className='text_no_chat'>
                                <GiPadlock className='icon_no_chat' />
                                Tus mensajes personales estan cifrados de extremo a extremo
                            </p>
                        </div>
                )}
            </div>

            <ModalProfileContac isOpen={modalOpen} onClose={handleCloseModal}>
                {
                    editProfile && <UpdateMyProfileScreen />
                    ||
                    userProfile && <ContactProfileScreen userProfile={userProfile} onEdit={handleEditProfile} />
                    ||
                    modalContacId && <ContactProfileScreen />
                }
            </ModalProfileContac>
        </div>
    )
}

export default HomeScreen

