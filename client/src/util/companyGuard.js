import { redirect } from "react-router-dom";
import { getAuthToken } from "./auth";

const host =  process.env.REACT_APP_REST_API_URL;

const companyGuard = async () => {
    const token = getAuthToken();
    
    if ( token ) {
        const response = await fetch(host + '/userData')

        const data = await response.json();

        if( data.userData.hasData === false ) {
            return redirect('/auth');
        }

        if (data.userData.hasData && data.userData.roles.includes('company') === false) {
            return redirect('/auth');

        }
    } else {
        return redirect('/auth');

    }
    return null;
}

export default companyGuard;