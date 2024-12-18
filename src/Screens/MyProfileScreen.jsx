import React from 'react'
import { usePerfil } from '../Hooks'
import { Link } from 'react-router-dom'

const MyProfileScreen = () => {
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
                                    {
                                        perfil.img ?
                                        <img src={perfil.img} alt="perfil" width={100}/>
                                        : <img src="/Assets/Avatar.png" alt="avatar" width={100}/>
                                    }
                                    {perfil.name}
                                    <br />
                                    {perfil.email}
                                    <br />
                                    {perfil.estado}

                                    <Link to={'/update-my-profile'}>Editar perfil</Link>
                            </div>
                    )
            }
        </div>
    )
}

export default MyProfileScreen