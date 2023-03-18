import { createBrowserRouter } from "react-router-dom";
import React from "react";

//components
import RootLayout from "../components/Root";
import ErrorPage from "../components/pages/Error";
import Board from "../components/pages/applying/Board";
import JobsList from "../components/pages/applying/JobsList";
import JobDetails from "../components/pages/applying/JobDetails";
import Applying from "../components/pages/applying/Applying";
import Profile from "../components/pages/profile/Profile";
import Messages from "../components/pages/messages/Messages";
import UserAuth from "../components/pages/auth/UserAuth";
import CreateJob from "../components/pages/applying/CreateJob";

//Admin Components
import AdminRootLayout from "../components/admin/AdminRootLayout";
import CreateCategory from "../components/pages/admin/CreateCategory";
import CreateSubCategory from "../components/pages/admin/CreateSubCategory";

//utils
import loader from "./loader";
import action from "./action";
import { action as logoutAction } from '../components/pages/auth/Logout'

import { transformCategoryFormData } from "../components/admin/CategoryForm";
import { formatCategoryData } from "../components/applying/JobForm";
import { formatJobDetailsData } from '../components/pages/applying/JobDetails';
import { formatProfileData } from '../components/pages/profile/Profile';
import { getAuthToken } from "./auth";

//create a relation between the routes and the components,
//or simply we register our routes here

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,//this route will be triggered whenever a loader throws an Error or when a user visits wrong URL
        id: 'root',
        loader: ({request, params}) => getAuthToken() !== 'EXPIRED' ? loader('/userData') : null,
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
                        element: <JobsList/>,
                    },
                    {
                        path: ':posterId',
                        id: 'poster-details',
                        loader: ({request, params}) => loader('/jobData/jobs/' + params['posterId'], formatJobDetailsData),
                        children: [
                            {
                                index: true,
                                element: <JobDetails/>,
                            },
                            {
                                path: '',
                                element: <JobDetails/>,
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
                path: 'profile',
                id: 'profile-info',
                loader: ( { request, params } ) => loader('/profileData/userInfo', formatProfileData, ['company']),
                element: <Profile/>
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
              path: 'logout',
              action: logoutAction  
            },
            {
                path: 'create',
                loader: ({request, params}) => loader('/categoryData/categories', formatCategoryData, ['company']),
                id:'create-job',
                element: <CreateJob/>
            },
            {
                path: 'admin',
                element: <AdminRootLayout/>,
                loader: ({request, params}) => loader('/categoryData/categories', (data) => data.items, ['admin']),
                id: 'admin',
                children: [
                    {
                        path: 'category',
                        action: ({request, params}) => action(request, params, transformCategoryFormData , '/categoryData/categories'),
                        element: <CreateCategory/>
                    },
                    {
                        path: 'subcategory',
                        // action: ({request, params}) => action(request, params, transformSubCategoryFormData, '/subCategoryData/subcategories'),
                        element: <CreateSubCategory/>
                    }
                ]
            }
        ]
    }
]);