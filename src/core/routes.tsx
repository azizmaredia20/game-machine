/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from "react-router-dom";
import loadable from '@loadable/component'

import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import Layout from "@core/components/Layout/Layout";
import CreateGameRoom from "@screens/Game/CreateGameRoom";
import CreateUsers from "@screens/Game/CreateUsers";
import DailyReport from "@screens/Report/DailyReport";
import SummaryReport from "@screens/Report/SummaryReport";
import gameLoader from "@loaders/gameLoader";
import Spinner from "@core/components/Spinner";
import { loginAction, registerAction } from "./actions";

const Verify = loadable(() => import("@screens/Verify/Verify"), { fallback: <div><Spinner /></div> });
const Game = loadable(() => import("@screens/Game/Game"), { fallback: <div><Spinner /></div> });
const Expenses = loadable(() => import("@screens/Expenses/Expenses"), { fallback: <div><Spinner /></div> });

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
                element: <Game />,
                loader: gameLoader,
            },
            {
                path: "/admin-data",
                element: <Game />
            },
            {
                path: "game-room",
                element: <CreateGameRoom />
            },
            {
                path: "create-user",
                element: <CreateUsers />
            },
            {
                path: "expenses",
                element: <Expenses />,
            },
            {
                path: "verify",
                element: <Verify />,
            },
            {
                path: "report",
                element: <DailyReport />
            },
            {
                path: "summary",
                element: <SummaryReport />
            }
        ]
    }
]

export default routes;
