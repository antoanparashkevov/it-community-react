import { redirect } from "react-router-dom";

const host = process.env.REACT_APP_REST_API_URL;

export async function action () {
    await fetch(host + '/authData/logout')
    localStorage.clear();

    return redirect('/')
}