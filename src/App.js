import './App.css';
import React from "react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Components
import PostersList from "./components/pages/applying/PostersList";
import Companies from "./components/pages/applying/Companies";
import Messages from "./components/pages/messages/Messages";
import Board from "./components/pages/applying/Board";
import Root from "./components/Root";
import Error from "./components/pages/Error";
import PosterDetails from "./components/pages/applying/PosterDetails";

//create a relation between the routes and the components,
//or simply we register our routes here

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                // or path: ''
                index: true,//it's the default route that should be display if the root path is active (/)
                element: <Board/>
            },
            {
                path: '/posters',
                element: <PostersList/>,
            },
            {
              path: '/posters/details/:posterId',
              element: <PosterDetails/>          
            },
            {
                path: '/companies',
                element: <Companies/>
            },
            {
                path: '/messages',
                element: <Messages/>
            },
        ]
    }
]);
    
function App() {
      //register the list of routes
      return <RouterProvider router={routes}/>
}

export default App;
