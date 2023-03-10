import { json } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const loader = async (url, formatData) => {
    
    console.log('HOST', host)
    console.log('URL', url)

    try {
        const response = await fetch(host + url)

        if( response.ok === false ) {

            if( response.status === 401 ) {
                //todo util func
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
            status: 500
        } ) 
    }
}

export default loader;