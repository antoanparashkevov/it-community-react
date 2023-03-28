import { createBrowserRouter } from "react-router-dom";
import React from "react";

//components
import RootLayout, { authDefer } from "../components/Root";
import ErrorPage from "../components/pages/Error";
import Board from "../components/pages/applying/Board";
import JobsList from "../components/pages/applying/JobsList";
import JobDetails, { jobDetailsDefer } from "../components/pages/applying/JobDetails";
import Applying from "../components/pages/applying/Applying";
import Profile, { profileDefer } from "../components/pages/profile/Profile";
import Messages from "../components/pages/messages/Messages";
import UserAuth from "../components/pages/auth/UserAuth";
import CreateJob from "../components/pages/applying/CreateJob";

//Admin Components
import AdminRootLayout from "../components/admin/AdminRootLayout";
import CreateCategory from "../components/pages/admin/CreateCategory";
import CreateSubCategory, { categoryDefer } from "../components/pages/admin/CreateSubCategory";
import EditJob from "../components/pages/profile/EditJob";

//utils
import loader from "./loader";
import action from "./action";
import { action as logoutAction } from '../components/pages/auth/Logout'

import { transformCategoryFormData } from "../components/admin/CategoryForm";
import { formatCategoryData } from '../components/layout/filters/CategoriesFilter';
import { formatJobEditData } from "../components/pages/profile/EditJob";
import { getAuthToken } from "./auth";
import userGuard from "./userGuard";

//create a relation between the routes and the components,
//or simply we register our routes here

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,//this route will be triggered whenever a loader throws an Error or when a user visits wrong URL
        id: 'root',
        loader: ({request, params}) => authDefer(),
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
                        loader: ({request, params}) => loader('/categoryData/categories', formatCategoryData),
                        element: <JobsList/>,
                    },
                    {
                        path: ':posterId',
                        id: 'poster-details',
                        loader: ({request, params}) => jobDetailsDefer(params),
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
                                        loader: ( { request, params } ) => userGuard(),
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
                loader: () => loader(null,null,['company']),
                children: [
                    {
                        index: true,
                        id: 'profile-info',
                        loader: ( { request, params } ) => profileDefer(),
                        element: <Profile/>,
                    },
                    {
                        path: ':posterId/edit',
                        id: 'edit-job',
                        loader: ( { request, params } ) => loader('/jobData/jobs/' + params['posterId'], formatJobEditData, ['company']),
                        element: <EditJob/>
                    }
                ]
            },
            {
                path: 'messages',
                loader: ({request, params}) => loader(null, null, ['company']),
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
                id:'create-job',
                loader: ({request, params}) => loader(null, null, ['company']),
                element: <CreateJob/>
            },
            {
                path: 'admin',
                element: <AdminRootLayout/>,
                loader: ({request, params}) => categoryDefer(),
                id: 'admin',
                children: [
                    {
                        path: 'category',
                        action: ({request, params}) => action(request, params, transformCategoryFormData , '/categoryData/categories', '/admin/subcategory'),
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