import React, { useContext, useEffect, useState } from 'react'
import { usePerfil } from '../Hooks'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContentx'
import { RiLogoutCircleLine } from "react-icons/ri"
import './navbar.css'


const Navbar = ({ handleOpenUserProfile }) => {
    const { perfil, loading_perfil, error_perfil } = usePerfil()
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }


    return (
        <div className='container_navbar'>
            {
                loading_perfil
                    ? <span>Cargando...</span>
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


export default Navbar