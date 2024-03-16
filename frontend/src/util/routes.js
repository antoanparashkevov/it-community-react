import { createBrowserRouter } from "react-router-dom";
import React, {lazy, Suspense} from "react";

//loading spinner
import Fallback from "../components/layout/Fallback";

//components
import RootLayout from "../components/Root";
import ErrorPage from "../components/pages/Error";
import Board from "../components/pages/applying/Board";
import JobDetails, { jobDetailsDefer } from "../components/pages/applying/JobDetails";
import Applying from "../components/pages/applying/Applying";
import Profile, { profileDefer } from "../components/profile/Profile";

//Admin Components
import AdminRootLayout from "../components/admin/AdminRootLayout";
import CreateCategory from "../components/pages/admin/CreateCategory";
import CreateSubCategory, { categoryDefer } from "../components/pages/admin/CreateSubCategory";
import EditJob, { jobEditDefer } from "../components/pages/profile/EditJob";

//utils
import loader from "./loader";
import action from "./action";
import { action as logoutAction } from '../components/pages/auth/Logout'

import { transformCategoryFormData } from "../components/admin/CategoryForm";

//lazy loading
//this is async operation -> returns a Promise
const JobsList = lazy(() => import('../components/pages/applying/JobsList'));
const UserAuth = lazy(() => import("../components/pages/auth/UserAuth"));
const Messages = lazy(() => import("../components/pages/messages/Messages"));
const CreateJob = lazy(() => import("../components/pages/applying/CreateJob"));

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
                children: [
                    {
                        index: true,
                        //We wait for resolving the Promise with the Suspense component
                        element: (
                            <Suspense fallback={<Fallback />}>
                                <JobsList/>
                            </Suspense>
                        ),
                    },
                    {
                        path: ':posterId',
                        id: 'poster-details',
                        element: <JobDetails/>,
                        loader: ({params}) => jobDetailsDefer(params),
                        children: [
                            {
                                path: 'apply',
                                element: <Applying/>
                            }
                        ]
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
                        element: <Profile/>,
                        loader: () => profileDefer()
                    },
                    {
                        path: ':posterId/edit',
                        id: 'edit-job',
                        element: <EditJob/>,
                        loader: ( { params } ) => jobEditDefer(params)
                    }
                ]
            },
            {
                path: 'messages',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <Messages/>
                    </Suspense>
                )
            },
            {
                path: 'auth',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <UserAuth/>
                    </Suspense>
                )
            },
            {
              path: 'logout',
              action: logoutAction  
            },
            {
                path: 'create',
                id:'create-job',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <CreateJob/>
                    </Suspense>
                )
            },
            {
                path: 'admin',
                element: <AdminRootLayout/>,
                loader: () => loader(null,null,['admin']),
                children: [
                    {
                        path: 'category',
                        action: ({request, params}) => action(request, params, transformCategoryFormData , '/categoryData/categories', '/admin/subcategory'),
                        id: 'admin',
                        element: <CreateCategory/>
                    },
                    {
                        path: 'subcategory',
                        // action: ({request, params}) => action(request, params, transformSubCategoryFormData, '/subCategoryData/subcategories'),
                        loader: () => categoryDefer(),
                        element: <CreateSubCategory/>
                    }
                ]
            }
        ]
    }
]);