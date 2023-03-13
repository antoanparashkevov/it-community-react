export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function handleAuthentication(email, id, token, roles) {
    localStorage.setItem('email', email)
    localStorage.setItem('userId', id)
    localStorage.setItem('authToken', token)
    localStorage.setItem('roles', roles.join(', '))
}