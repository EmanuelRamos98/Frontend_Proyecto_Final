import React from 'react'
import { useUsers } from '../Hooks'


const HomeScreen = () => {
    const { user_state, user_Loading_state, user_error_state } = useUsers()

    return (
        <div>
            <h1>Warap</h1>

            <div>
                <h2>Usuarios</h2>
                {
                    user_Loading_state
                        ? <span>Cargando</span>
                        : (
                            user_error_state
                                ? <span>{user_error_state}</span>
                                : <div>
                                    {
                                        user_state.map(
                                            (user) => {
                                                return (
                                                    <User user={user} key={user.id} />
                                                )
                                            }
                                        )
                                    }
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen

const User = ({ user }) => {
    return (
        <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.estado}</p>
        </div>
    )
}