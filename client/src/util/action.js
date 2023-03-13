import { json } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';


const action = async (request, params, transformFetchedFormData , url) => {
    const data = await request.formData();
    
    //transformFetchedFormData is a function which gets all fields from the form and create an object to send
    const formData = transformFetchedFormData(data)
    
    console.log('FETCHED data from formData() >>> ', data)
    console.log('formData >>> ', formData)
    
    try {
        const response = await fetch(host + url, {
            method: request.method,
            headers: {
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify(formData)
        })
        
        if( response.ok === false  || response.status === 400) {
            return response;
        }
        
        return response;
        
    } catch ( err ) {
        throw json({message: err.message || 'Could not create! Try again later'}, {
            status: 500
        })
    }
}

export default action;