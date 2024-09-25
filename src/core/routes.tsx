/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from "react-router-dom";
import loadable from '@loadable/component'

import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import Layout from "@core/components/Layout/Layout";
import gameLoader from "@loaders/gameLoader";
import Expenses from "@screens/Expenses/Expenses";
import Spinner from "@core/components/Spinner";
import { loginAction, registerAction, gameAction } from "./actions";

const Verify = loadable(() => import("@screens/Verify/Verify"), { fallback: <div><Spinner /></div> });
const Game = loadable(() => import("@screens/Game/Game"), { fallback: <div><Spinner /></div> });

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
        action: gameAction,
        children: [
            {
                index: true,
                element: <Game />,
                loader: gameLoader,
                action: gameAction,
            },
            {
                path: "expenses",
                element: <Expenses />,
            },
            {
                path: "verify",
                element: <Verify />
            },
            {
                path: "reports",
                element: <Verify />
            }
        ]
    }
]

export default routes;