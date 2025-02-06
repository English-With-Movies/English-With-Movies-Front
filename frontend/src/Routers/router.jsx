import AdminDashboard from "../pages/Admin/Admin Dashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import BlogPage from "../pages/Client/Blog page";
import ClientLayout from "../pages/Client/ClientLayout";
import HomePage from "../pages/Client/Home page";
import LoginPage from "../pages/Client/Login";
import MoviesPage from "../pages/Client/Movies";
import MoviesDetail from "../pages/Client/Movies Detail";
import PointsRanking from "../pages/Client/Points ranking";
import PremiumPage from "../pages/Client/Premium Page";
import RegisterPage from "../pages/Client/Register";
import SeriesDetail from "../pages/Client/Series Detail";
import SeriesPage from "../pages/Client/Series page";
import StreakRanking from "../pages/Client/Streak Ranking";
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
                path: "/movies/:id",
                element: <MoviesDetail />,
            },
            {
                path: "/series",
                element: <SeriesPage />,
            },
            {
                path: "/series/:id",
                element: <SeriesDetail />,
            },
            {
                path: "/my-profile",
                element: <UserProfile />,
            },
            {
                path: '/my-profile/points-ranking',
                element: <PointsRanking />
            },
            {
                path: '/my-profile/streak-ranking',
                element: <StreakRanking />
            },
            {
                path: "/premium",
                element: <PremiumPage />,
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