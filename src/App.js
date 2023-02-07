import './App.css';
import React from "react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Components
import Posters from "./components/pages/Posters";
import Companies from "./components/pages/Companies";
import Messages from "./components/pages/Messages";
import Board from "./components/pages/Board";
import Root from "./components/pages/Root";
import Error from "./components/pages/Error";

//create a relation between the routes and the components,
//or simply we register our routes here

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Board/>
      },
      {
        path: '/posters',
        element: <Posters/>
      },
      {
        path: '/companies',
        element: <Companies/>
      },
      {
        path: '/messages',
        element: <Messages/>
      }
    ]
  }
])

function App() {
      //register the list of routes
      return <RouterProvider router={routes}/>
}

export default App;
