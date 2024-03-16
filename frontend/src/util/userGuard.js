import { getAuthToken } from "./auth";
import { redirect } from "react-router-dom";

const userGuard = () => {
    const token = getAuthToken();
    
    if ( !token ) {
        return redirect('/auth')
    }
    
    return null;
}

export default userGuard;