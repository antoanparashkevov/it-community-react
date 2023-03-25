import { json, redirect, useSubmit } from "react-router-dom";
import { getAuthToken } from "./auth";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

//TODO use defer
const loader = async (url, formatData, userType) => {
    
    // console.log('HOST', host)
    // console.log('URL', url)
    
    const token = getAuthToken();

    const options = {
        method: 'GET',
        headers: {}
    }

    if ( token ) {
        options.headers['X-Authorization'] = token;
    }
    
    if ( userType ) {
        
        if ( userType.includes('company') ) {
            const response = await fetch(host + '/userData', options)

            const data = await response.json();

            if( data.userData.hasData === false ) {
                return redirect('/auth')
            }

            if (data.userData.hasData && data.userData.roles.includes('company') === false) {
                return redirect('/auth')
            }
        }

        if( userType.includes('admin') ) {
            const response = await fetch(host + '/userData', options)

            const data = await response.json();

            if( data.userData.hasData === false ){
                return redirect('/auth')
            }

            if (data.userData.hasData && data.userData.roles.includes('admin') === false) {
                return redirect('/auth')
            }
        }
       
    }
    
    if( url ) {
        try {
            const response = await fetch(host + url, options)

            if( response.ok === false ) {

                if( response.status === 401 ) {
                    localStorage.clear();
                    window.location.reload();
                    return null;
                }
                
                const error = await response.json()
                throw new Error(error.message)
            }

            if( formatData ) {
                const data = await response.json();
                return formatData(data)
            } else {
                //the loader automatically extracts the data from the response
                return response;
            }

        } catch ( error ) {
            // throw new Response(JSON.stringify({ message: error.message || 'Something went wrong!' }))
            //an alternative to
            throw json( { message: error.message || 'Something went wrong!' }, {
                status: 400
            } )
        }
    }
    return null;
}

export default loader;