import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../Context/AuthContentx"


const ProtectedRoute = () => {
    const { is_authenticated_state, is_authenticated_checked } = useContext(AuthContext)

    if (!is_authenticated_checked) {
        return <div>Cargando...</div>
    }
    return (
        <>
            {
                is_authenticated_state
                    ? <Outlet />
                    : <Navigate to={'/login'} />
            }
        </>
    )
}

export default ProtectedRoute