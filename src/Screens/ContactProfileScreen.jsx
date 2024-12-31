import React, { useEffect, useState } from 'react'
import { useContactProfile, usePerfil } from '../Hooks'
import { useChat } from '../Context/ChatContext'
import { MdModeEditOutline } from "react-icons/md"
import './profileCard.css'


const ContactProfileScreen = ({ userProfile, onEdit }) => {
    const { perfil, loading_perfil, error_perfil } = usePerfil() //Obtiene los datos del perfil del usuario
    const { selectedContacId } = useChat() //ID del contacto selecionado

    //Renderiza perfil del ususario si es true
    if (userProfile) {
        return (
            <div>
                {
                    loading_perfil
                        ? <span>Catgando ...</span>
                        : (
                            error_perfil
                                ? <span>{error_perfil}</span>
                                : (
                                    <ProfileCard
                                        name={perfil.name}
                                        estado={perfil.estado}
                                        email={perfil.email}
                                        img={perfil.img}
                                        onEdit={onEdit}
                                    />
                                )
                        )
                }
            </div>
        )
    }

    //Obtiene los datos del perfil del contacto selecionado
    const { contacto_profile, loading_contacto_profile, error_contacto_profile } = useContactProfile(selectedContacId)

    //Retorna el perfil del contacto
    return (
        <div>
            {
                loading_contacto_profile
                    ? <span>Catgando ...</span>
                    : (
                        error_contacto_profile
                            ? <span>{error_contacto_profile}</span>
                            : (
                                <ProfileCard
                                    name={contacto_profile.name}
                                    estado={contacto_profile.estado}
                                    email={contacto_profile.email}
                                    img={contacto_profile.imagen}
                                />
                            )
                    )
            }
        </div>
    )
}


const ProfileCard = ({ name, estado, email, img, onEdit }) => {
    return (
        <div className='container_card_profile'>
            <img src={img || '/Assets/Avatar.png'} alt={name} className='img_profile_card' />
            <div className='container_data_profile_card'>
                <h2 className='name_profile_card'>{name}</h2>
                <p className='estado_profile_card'>{estado}</p>
                <p className='email_profile_card'>{email}</p>
            </div>
            {/* Boton para editar el perfil, aparece solo si se pasa 'onEdit' */}
            {
                onEdit &&
                <button onClick={onEdit} className='btn_profile_card'> Editar perfil <MdModeEditOutline /></button>
            }
        </div>
    )
}

export default ContactProfileScreen