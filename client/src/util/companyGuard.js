import { redirect } from "react-router-dom";
import { getAuthToken } from "./auth";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const companyGuard = async () => {
    const token = getAuthToken();
    
    if ( token ) {
        const response = await fetch(host + '/userData')

        const data = await response.json();

        if( data.userData.hasData === false ) {
            return 'notpassed';
        }

        if (data.userData.hasData && data.userData.roles.includes('company') === false) {
            return 'notpassed';
        }
    } else {
        return 'notpassed';
    }
    return 'passed';
}

export default companyGuard;