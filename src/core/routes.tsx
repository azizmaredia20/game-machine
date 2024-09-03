/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from "react-router-dom";
import loadable from '@loadable/component'

import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import Layout from "@core/components/Layout/Layout";
import Home from "@screens/Home/Home";
import homeLoader from "@loaders/homeLoader";
import About from "@screens/About/About";
import { loginAction, registerAction } from "./actions";

const Contact = loadable(() => import("@screens/Contact/Contact"), { fallback: <div>Loading...</div> });

const routes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
        action: loginAction
    },
    {
        path: "/register",
        element: <Register />,
        action: registerAction
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: homeLoader
            }, {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />
            }
        ]
    }
]

export default routes;