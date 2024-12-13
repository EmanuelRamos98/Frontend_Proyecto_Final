import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../Context/AuthContentx"


const ProtectedRoute = () => {
    const { is_authenticated_state } = useContext(AuthContext)

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