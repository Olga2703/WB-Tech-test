import {createBrowserRouter, Navigate} from "react-router-dom";
import {UsersPage} from "../pages/UsersPage.tsx";
import {UserDetailPage} from "../pages/UserDetailPage.tsx";
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import {RootLayout} from "../layouts/RootLayout.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/users" replace/>,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'users/:id',
                element: <UserDetailPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            }
        ]
    }
])