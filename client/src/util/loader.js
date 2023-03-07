import { json } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const loader = async (url, data = {}) => {
    
    console.log('HOST', host)
    console.log('URL', url)
    console.log('Data to POST >>> ', data)
    
    const options = {
        method: 'GET',
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

            //the loader automatically extracts the data from the response
            return response;

    } catch ( error ) {
        // throw new Response(JSON.stringify({ message: error.message || 'Something went wrong!' }))
        //an alternative to
        throw json( { message: error.message || 'Something went wrong!' }, {
            status: 500
        } ) 
    }
}

export default loader;