export function getAuthToken() {
    let token = localStorage.getItem('authToken');
    let duration = calculateExpirationDate();
    
    if( !token ) {
        return null;
    }
    
    if( duration < 0 ) {
        return 'EXPIRED';
    }
    
    return token;
}

export const calculateExpirationDate = () => {
    let storedExpirationDate = localStorage.getItem('expirationDate');
    
    let expirationDate = new Date(storedExpirationDate);
    let now = new Date();
    
    return expirationDate.getTime() - now.getTime();//returns the timestamp in milliseconds
}

export function handleAuthentication(email, id, token) {
    localStorage.setItem('email', email)
    localStorage.setItem('userId', id)
    localStorage.setItem('authToken', token)

    let expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1)//current time + 1h
    
    
    localStorage.setItem('expirationDate', expirationDate.toISOString())
}

export function getAuthData() {
    if( localStorage.length > 0 ) {
        return {
            token: getAuthToken(),
            email: localStorage.getItem('email'),
            userId: localStorage.getItem('userId'),
        }
    }
    
    return null;
}