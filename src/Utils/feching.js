
const getAuthenticatedHeaders = () => {
    const access_token = sessionStorage.getItem('access-token')
    return {
        'Authorization': `Bearer ${access_token}`,
        'content-Type': 'application/json'
    }
}

export { getAuthenticatedHeaders }