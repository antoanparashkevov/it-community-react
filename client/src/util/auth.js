export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function getRoles() {
    return localStorage.getItem('roles')
}

export function handleAuthentication(email, id, token, roles) {
    localStorage.setItem('email', email)
    localStorage.setItem('userId', id)
    localStorage.setItem('authToken', token)
    localStorage.setItem('roles', roles)
}

export function getAuthData() {
    if( localStorage.length > 0 ) {
        return {
            token: getAuthToken(),
            email: localStorage.getItem('email'),
            userId: localStorage.getItem('userId'),
            roles: getRoles()
        }
    }
    
    return null;
}