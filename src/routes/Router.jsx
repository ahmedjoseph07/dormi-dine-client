import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import DashboardLayout from "../layouts/DashboadLayout/DashboardLayout";
import HomePage from "../pages/HomePage";
import MealsPage from "../pages/MealsPage";
import UpcomingMealsPage from "../pages/UpcomingMealsPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ContactsPage from "../pages/ContactsPage";
import MealDetailsPage from "../pages/MealsDetailsPage";
import Hero from "../components/Dashboard/Hero/Hero";
import Profile from "../components/Dashboard/Profile/Profile";
import RequestedMeals from "../components/Dashboard/RequestedMeals/RequestedMeals";
import MyReviews from "../components/Dashboard/MyReviews/MyReviews";
import PaymentHistory from "../components/Dashboard/PaymentHistory/PaymentHistory";
import AdminProfile from "../components/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../components/Dashboard/ManageUsers/ManageUsers";
import AddMeal from "../components/Dashboard/AddMeals/AddMeals";
import AllMeals from "../components/Dashboard/AllMeals/AllMeals";
import AllReviews from "../components/Dashboard/AllReviews/AllReviews";
import UpcomingMeals from "../components/Dashboard/UpcomingMeals/UpcomingMeals";
import ServeMeal from "../components/Dashboard/ServeMeal/ServeMeal";
import CheckoutPage from "../pages/CheckoutPage";
import PrivateRoute from "../routes/PrivateRoute"
import AdminRoutes from "./AdminRoutes";
import ErrorPage from "../pages/ErrorPage";
import UserGuidePage from "../pages/UserGuidePage";
import SupportPage from "../pages/SupportPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage/>,
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
                path: "/upcoming-meals",
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
            {
                path: "/about",
                Component: AboutPage,
            },
            {
                path: "/contact-us",
                Component: ContactsPage,
            },
            {
                path: "/meals/:mealId",
                Component: MealDetailsPage,
            },
            {
                path: "/user-guide",
                Component: UserGuidePage,
            },
            {
                path: "/support",
                Component: SupportPage,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            {
                index: true,
                Component: Hero,
            },
            {
                path: "profile",
                Component: Profile,
            },
            {
                path: "requested-meals",
                Component: RequestedMeals,
            },
            {
                path: "my-reviews",
                Component: MyReviews,
            },
            {
                path: "payment-history",
                Component: PaymentHistory,
            },
            {
                path: "admin-profile",
                element: <AdminRoutes> <AdminProfile/></AdminRoutes>,
            },
            {
                path: "manage-users",
                element: <AdminRoutes><ManageUsers/></AdminRoutes>,
            },
            {
                path: "add-meal",
                element: <AdminRoutes><AddMeal/></AdminRoutes>,
            },
            {
                path: "all-meals",
                element: <AdminRoutes><AllMeals/></AdminRoutes>,
            },
            {
                path: "all-reviews",
                element: <AdminRoutes><AllReviews/></AdminRoutes>,
            },
            {
                path: "serve-meal",
                element: <AdminRoutes><ServeMeal/></AdminRoutes>,
            },
            {
                path: "upcoming-meals",
                element: <AdminRoutes><UpcomingMeals/></AdminRoutes>,
            },
        ],
    },
    {
        path: "/checkout/:packageName",
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>,
    },
]);
