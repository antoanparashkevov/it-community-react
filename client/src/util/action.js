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
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify(formData)
        })
        
        if( response.ok === false ) {
            const error = await response.json();
            throw new Error(error.message)
        }
        
        return response;
        
    } catch ( err ) {
        throw json({message: err.message || 'Could not create the Category! Try again later'}, {
            status: 500
        })
    }
    
    
    
    
    console.log('formData >>> ', formData);
    
}

export default action;