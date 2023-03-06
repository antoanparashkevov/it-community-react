import { createBrowserRouter } from "react-router-dom";
import React from "react";

//components
import RootLayout from "../components/Root";
import ErrorPage from "../components/pages/Error";
import Board from "../components/pages/applying/Board";
import PostersList, { loader as postersLoader } from "../components/pages/applying/PostersList";
import PosterDetails, { loader as posterDetailsLoader } from "../components/pages/applying/PosterDetails";
import Applying from "../components/pages/applying/Applying";
import Companies from "../components/pages/companies/Companies";
import Messages from "../components/pages/messages/Messages";
import UserAuth from "../components/pages/auth/UserAuth";
import CreateJob from "../components/pages/applying/CreateJob";

//Admin Components
import AdminRootLayout from "../components/admin/AdminRootLayout";
import CreateCategory from "../components/pages/admin/CreateCategory";
import CreateSubCategory from "../components/pages/admin/CreateSubCategory";

//create a relation between the routes and the components,
//or simply we register our routes here

export const routes = createBrowserRouter([
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
            {
                path: 'auth',
                element: <UserAuth/>
            },
            {
                path: 'create',
                element: <CreateJob/>
            },
            {
                path: 'admin',
                element: <AdminRootLayout/>,
                children: [
                            {
                                path: 'category',
                                element: <CreateCategory/>
                            },
                            {
                                path: 'subcategory',
                                element: <CreateSubCategory/>
                            }
                ]
            }
        ]
    }
]);