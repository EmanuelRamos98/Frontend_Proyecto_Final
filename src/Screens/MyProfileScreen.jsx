import React from 'react'
import { usePerfil } from '../Hooks'

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
                                        perfil.image_base64 ?
                                        <img src={perfil.image_base64} alt="perfil" />
                                        : <img src="/Assets/Avatar.png" alt="avatar" width={100}/>
                                    }
                                    {perfil.name}
                                    <br />
                                    {perfil.email}
                                    <br />
                                    {perfil.estado}
                            </div>
                    )
            }
        </div>
    )
}

export default MyProfileScreen