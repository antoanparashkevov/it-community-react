import { getAuthToken } from "../util/auth";
import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = getAuthToken();
    
    if ( token ) {
        const decodedPayload = jwtDecode(token);
        
        return {
            userData: {
                ...decodedPayload,
                hasData: true
            },
            token
        }
        
    }

    return {
        userData: {
            roles: [],
            email: '',
            _id: '',
            hasData: false,
        },
        token: ''
    }
    
}

export default useAuth;