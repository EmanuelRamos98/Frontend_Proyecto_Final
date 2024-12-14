import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import { getAuthenticatedHeaders } from '../Utils/feching'
import { useContactProfile } from '../Hooks'

const ContactProfileScreen = () => {
    const { receiverId } = useParams()
    const { contacto_profile, loading_contacto_profile, error_contacto_profile } = useContactProfile(receiverId)

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
                                    ? <img src={contacto_profile.imagen} alt={contacto_profile.name} />
                                    : <img src="/Assets/Avatar.png" alt={contacto_profile.name} width={100}/>
                                }
                            </div>
                    )
            }
        </div>
    )
}

export default ContactProfileScreen