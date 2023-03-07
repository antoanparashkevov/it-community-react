import { json } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const loader = () => {
    
    const sendRequest = async (url, method = 'GET', data = {}) => {
        console.log('METHOD', method)
        console.log('HOST', host)
        console.log('URL', url)
        console.log('Data to POST >>> ', data)
        
        const options = {
            method: method,
            headers: {}
        }

        if( Object.keys(data).length > 0 ) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data)
        }

        try {
            const response = await fetch(
                host + url,
                options
            )

            if( response.ok === false ) {

                if( response.status === 401 ) {
                    //todo util func
                }
                const error = await response.json()
                throw new Error(error.message)
            }

            if( response.status === 204 ) {
                return response;
            } else {
                return await response.json();
            }

        } catch ( error ) {
            throw json( { message: error.message || 'Something went wrong!' }) 
        }
        
    }
    
    return sendRequest;
    
}

export default loader;