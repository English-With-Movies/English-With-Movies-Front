
import AdminDashboard from "../pages/Admin/Admin Dashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import BlogPage from "../pages/Client/Blog page";
import ClientLayout from "../pages/Client/ClientLayout";
import HomePage from "../pages/Client/Home page";
import LoginPage from "../pages/Client/Login";
import MoviesPage from "../pages/Client/Movies";
import RegisterPage from "../pages/Client/Register";
import SeriesPage from "../pages/Client/Series page";
import UserProfile from "../pages/Client/User page";
import NotFound from "../pages/NotFound";


const ROUTES = [
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/movies",
                element: <MoviesPage />,
            },
            {
                path: "/series",
                element: <SeriesPage />,
            },
            {
                path: "/my-profile",
                element: <UserProfile />,
            },
            {
                path: "/blog",
                element: <BlogPage />
            },
            {
                path: '/*',
                element: <NotFound />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    },
    {
        path: "/manage",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <AdminDashboard />,
            },

        ]

    },

]

export default ROUTES