import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders } from '../Utils/feching'

const useContactProfile = (receiverId) => {
    const [contacto_profile, setContactoProfile] = useState([])
    const [loading_contacto_profile, setLoadingContactoProfile] = useState(true)
    const [error_contacto_profile, setErrorContactoProfile] = useState(null)

    const handleProfileContac = async () => {
        if (!receiverId) {
            setErrorContactoProfile(true)
            setLoadingContactoProfile(false)
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/profile-contact/${receiverId}`, {
                method: 'GET',
                headers: getAuthenticatedHeaders()
            })
            const data = await response.json()
            if (!data.ok) {
                setErrorContactoProfile(data.message)
                setLoadingContactoProfile(false)
            } else {
                setContactoProfile(data.payload)
                setLoadingContactoProfile(false)
            }
        } catch (error) {
            setErrorContactoProfile(true)
        } finally {
            setLoadingContactoProfile(false)
        }
    }

    useEffect(() => {
        handleProfileContac()
    }, [receiverId])

    return {
        contacto_profile,
        loading_contacto_profile,
        error_contacto_profile
    }
}

export default useContactProfile