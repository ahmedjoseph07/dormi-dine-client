import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import DashboardLayout from "../layouts/DashboadLayout/DashboardLayout";
import HomePage from "../pages/HomePage";
import DashboardHome from "../pages/DashboardHome";
import MealsPage from "../pages/MealsPage";
import UpcomingMealsPage from "../pages/UpcomingMealsPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "/meals",
                Component: MealsPage,
            },
            {
                path: "/upcoming-meal",
                Component: UpcomingMealsPage,
            },
            {
                path: "/register",
                Component: RegisterPage,
            },
            {
                path: "/login",
                Component: LoginPage,
            },
        ],
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
        ],
    },
]);
