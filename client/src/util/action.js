import { redirect } from "react-router-dom";
import { getAuthToken } from "./auth";

const host = process.env.REACT_APP_REST_API_URL;


const action = async (request, params, transformFetchedFormData , url, redirectURL) => {
    const data = await request.formData();
    
    const token = getAuthToken();
    
    //transformFetchedFormData is a function which gets all fields from the form and create an object to send
    const formData = transformFetchedFormData(data)
    
    // console.log('FETCHED data from formData() >>> ', data)
    // console.log('formData >>> ', formData)
    
    try {
        const response = await fetch(host + url, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(formData)
        })
        
        if( response.ok === false  || response.status === 400 || !token ) {
            return response;
        }
        
        return redirect(redirectURL);
        
    } catch ( err ) {
        return err;
    }
}

export default action;