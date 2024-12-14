import React, { useEffect, useState } from 'react'
import { usePerfil } from '../Hooks'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { perfil, loading_perfil, error_perfil } = usePerfil()

    return (
        <div>
            {
                loading_perfil
                    ? <span>Cargando...</span>
                    : (
                        error_perfil
                            ? <span>{error_perfil}</span>
                            :
                            <div key={perfil.id}>
                                <Link to={'/my-profile'}>
                                    {perfil.name}
                                </Link>
                            </div>
                    )
            }
        </div>
    )
}


export default Navbar