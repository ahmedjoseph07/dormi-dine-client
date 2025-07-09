import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx/RootLayout";
import DashboardLayout from "../layouts/DashboadLayout.jsx/DashboardLayout";
import HomaPage from "../pages/HomePage";
import DashboardHome from "../pages/DashboardHome";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children:[
            {
            index:true,
            Component: HomaPage
        }

        ],
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children:[
            {
                index:true,
                Component: DashboardHome
            }
        ]
    }
]);