import { jwtDecode } from "jwt-decode"

const getAuthenticatedHeaders = () => {
    const access_token = sessionStorage.getItem('access-token')
    return {
        'Authorization': `Bearer ${access_token}`,
        'content-Type': 'application/json'
    }
}

const authenticatedUser = () => {
    const access_token = sessionStorage.getItem('access-token')
    const user = jwtDecode(access_token)
    return user
}


export { getAuthenticatedHeaders, authenticatedUser }