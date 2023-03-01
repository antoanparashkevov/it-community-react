import './App.css';
import React from "react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Components
import PostersList, { loader as postersLoader } from "./components/pages/applying/PostersList";
import Companies from "./components/pages/applying/Companies";
import Messages from "./components/pages/messages/Messages";
import Board from "./components/pages/applying/Board";
import RootLayout from "./components/Root";
import ErrorPage from "./components/pages/Error";
import PosterDetails, { loader as posterDetailsLoader } from "./components/pages/applying/PosterDetails";
import Applying from "./components/pages/applying/Applying";

//create a relation between the routes and the components,
//or simply we register our routes here

const routes = createBrowserRouter([
    { 
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,//this route will be triggered whenever a loader throws an Error or when a user visits wrong URL
        children: [
            {
                // or path: ''
                index: true,//it's the default route that should be display if the root path is active (/)
                element: <Board/>
            },
            {
                path: 'posters',
                id: 'posters',
                children: [
                    {
                        index: true,
                        element: <PostersList/>,
                        loader: postersLoader,
                    },
                    {
                        path: ':posterId',
                        id: 'poster-details',
                        loader: posterDetailsLoader,
                        children: [
                            {
                               index: true,
                               element: <PosterDetails/>,
                            },
                            {
                                path: '',
                                element: <PosterDetails/>,
                                children: [
                                    {
                                        path: 'apply',
                                        element: <Applying/>
                                    }
                                ]
                            },
                        ],
                    },
                ]
            },
            {
                path: 'companies',
                element: <Companies/>
            },
            {
                path: 'messages',
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
