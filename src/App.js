import './App.css';
import React from "react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Components
import TheHeader from "./components/UI/TheHeader";

//create a relation between the routes and the components
//or simply we register our routes here

const routes = createBrowserRouter([
  {
    path: '/',
    element: <TheHeader/>
  },
  {
    
  },
])

function App() {
  return (
      <RouterProvider router={routes}/>
  );
}

export default App;
