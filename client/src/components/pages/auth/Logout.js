import { redirect } from "react-router-dom";

export function action () {
    localStorage.clear();

    return redirect('/')
}