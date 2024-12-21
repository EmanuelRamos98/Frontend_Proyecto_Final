import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContentx'

const useLoggin = () => {
    const nav = useNavigate()
    const { login } = useContext(AuthContext)

    const actionLoggin = async (formState) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        if (!data.ok) {
            return data
        }
        if (!data.ok) {
            setErrorLoggin(data.message)
        }
        if (data.status === 403) {
            const user_email = data.payload.email
            nav(`/validation-email/${user_email}`)
        } else {
            login(data.payload.accesToken)
            nav('/home')
        }
        return data
    }
    return {
        actionLoggin
    }
}

export default useLoggin