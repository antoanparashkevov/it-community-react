import { redirect } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

export async function action () {
    await fetch(host + '/authData/logout')
    localStorage.clear();

    return redirect('/')
}