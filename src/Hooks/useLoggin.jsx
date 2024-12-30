import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContentx'

//Hook para el manejo del login
const useLoggin = () => {
    const nav = useNavigate()
    const { login } = useContext(AuthContext)//Obtengo la funcio de login del contexto de Autenticacion

    //Funcion para el manejo el inicio de sesion
    const actionLoggin = async (formState) => {
        //Realizamos una solicitud Post al endponit de login
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        const data = await response.json()
        //Si la respuesta no es exitosa, devolvemos el error
        if (!data.ok) {
            return {
                ok: false,
                message: data.errors || { global: data.message }
            }
        } else if (data.status === 403) 
        //Si el usuario no cuenta con validacion de email, lo redirigimos
            {
            const user_email = data.payload.email
            nav(`/validation-email/${user_email}`)
        } else {
        //Si el login es exitoso, almaceno el token y avanzamos al home
            login(data.payload.accesToken)
            nav('/home')
        }
        return data//Devolvemos al respuesta del servidor
    }
    return {
        actionLoggin
    }
}

export default useLoggin