import React, { useContext, useEffect, useState } from 'react'
import { usePerfil } from '../Hooks'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContentx'
import { RiLogoutCircleLine } from "react-icons/ri"
import './navbar.css'
import Skeleton from 'react-loading-skeleton'

//Componente Navbar
//Este muestra el acceso al perfil del usuario y el boton de cierre de sesion
const Navbar = ({ handleOpenUserProfile }) => {
    const { perfil, loading_perfil, error_perfil } = usePerfil()//Utilizo los valores necesarios del Hook
    const { logout } = useContext(AuthContext)//Utilizo la funcion de Logout del contexto

    //Funcion que controla el logout
    const handleLogout = () => {
        logout()
    }


    return (
        <div className='container_navbar'>
            {
                loading_perfil
                    ? <span><NavbarSkeleton /></span>
                    : (
                        error_perfil
                            ? <span>{error_perfil}</span>
                            :
                            <div key={perfil.id} className='container_perfil_navbar container_btn'>
                                <div to={'/my-profile'} onClick={handleOpenUserProfile} className='data_navbar'>
                                    <h2 className='name_navbar'>{perfil.name}</h2>
                                    <div className='container_img_perfil_navbar btn'>
                                        {
                                            perfil.img
                                                ? <img src={perfil.img} alt="avatar" className='img_perfil_navbar' />
                                                : <img src="/Assets/Avatar.png" alt="avatar" className='img_perfil_navbar' />
                                        }
                                    </div>
                                    <span className='tooltip'>Perfil</span>
                                </div>
                            </div>
                    )
            }
            <div className='container_btn'>
                <button
                    onClick={handleLogout}
                    className='btn'>
                    <RiLogoutCircleLine />
                </button>
                <span className='tooltip'>Salir</span>
            </div>
        </div>
    )
}


const NavbarSkeleton = () => {
    return (
        <div className='container_perfil_navbar container_btn'>
            <div className='data_navbar'>
                <h2 className='name_navbar'><Skeleton width={50} style={{ opacity: 0.5 }} /></h2>
                <div className='container_img_perfil_navbar btn'>
                    <span className='img_perfil_navbar'><Skeleton circle height={50} width={50} style={{ opacity: 0.5 }}/></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar