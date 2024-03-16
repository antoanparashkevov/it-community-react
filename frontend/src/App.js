import './App.css';
import React from "react";

import { RouterProvider } from 'react-router-dom';
import { routes } from "./util/routes";
    
function App() {
      //register the list of routes
      return <RouterProvider router={routes}/>
}

export default App;
