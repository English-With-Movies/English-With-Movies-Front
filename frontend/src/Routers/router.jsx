import { Navigate } from "react-router";
import AdminDashboard from "../pages/Admin/Admin Dashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import BlogPage from "../pages/Client/Blog page";
import ClientLayout from "../pages/Client/ClientLayout";
import HomePage from "../pages/Client/Home page";
import KnownWords from "../pages/Client/Known Words";
import LoginPage from "../pages/Client/Login";
import MoviesPage from "../pages/Client/Movies";
import MoviesDetail from "../pages/Client/Movies Detail";
import PointsRanking from "../pages/Client/Points ranking";
import PremiumPage from "../pages/Client/Premium Page";
import QuizPage from "../pages/Client/Quiz page";
import RegisterPage from "../pages/Client/Register";
import SeriesDetail from "../pages/Client/Series Detail";
import SeriesPage from "../pages/Client/Series page";
import StreakRanking from "../pages/Client/Streak Ranking";
import UserProfile from "../pages/Client/User page";
import NotFound from "../pages/NotFound";
import AvatarTable from "../pages/Admin/Admin Tables/Avatar Table";
import UserTable from "../pages/Admin/Admin Tables/User Table";
// favorites, store
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
                path: '/my-profile/known-words',
                element: <KnownWords />
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
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/quiz',
                element: <QuizPage />
            },
            {
                path: '/*',
                element: <NotFound />
            }
        ]
    },
    {
        path: "/manage",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Navigate to="dashboard" replace />
            },
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "tables",
                element: <Navigate to="user-table" replace />,
            },
            {
                path: "tables/avatar-table",
                element: <AvatarTable />
            },
            {
                path: "tables/user-table",
                element: <UserTable />,
            }
        ]

    },

]

export default ROUTES