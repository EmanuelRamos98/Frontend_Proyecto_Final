import React, { useEffect, useState } from 'react'
import { useContactProfile, usePerfil } from '../Hooks'
import { useChat } from '../Context/ChatContext'

const ContactProfileScreen = ({ userProfile, onEdit }) => {
    const { perfil, loading_perfil, error_perfil } = usePerfil()
    const { selectedContacId } = useChat()
    
    if (userProfile) {
        return (
            <div>
                {
                    loading_perfil
                        ? <span>Catgando ...</span>
                        : (
                            error_perfil
                                ? <span>{error_perfil}</span>
                                : <div>
                                    <h2>{perfil.name}</h2>
                                    <p>{perfil.estado}</p>
                                    <p>{perfil.email}</p>
                                    {
                                        perfil.img
                                            ? <img src={perfil.img} alt={perfil.name} width={100} />
                                            : <img src="/Assets/Avatar.png" alt={perfil.name} width={100} />
                                    }
                                    <button onClick={onEdit}>Editar</button>
                                </div>
                        )
                }
            </div>
        )
    }

    const { contacto_profile, loading_contacto_profile, error_contacto_profile } = useContactProfile(selectedContacId)

    return (
        <div>
            {
                loading_contacto_profile
                    ? <span>Catgando ...</span>
                    : (
                        error_contacto_profile
                            ? <span>{error_contacto_profile}</span>
                            : <div>
                                <h2>{contacto_profile.name}</h2>
                                <p>{contacto_profile.estado}</p>
                                <p>{contacto_profile.email}</p>
                                {
                                    contacto_profile.imagen
                                        ? <img src={contacto_profile.imagen} alt={contacto_profile.name} width={100} />
                                        : <img src="/Assets/Avatar.png" alt={contacto_profile.name} width={100} />
                                }
                            </div>
                    )
            }
        </div>
    )
}

export default ContactProfileScreen