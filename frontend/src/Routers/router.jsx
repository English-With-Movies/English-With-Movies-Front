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
import UserFavoritesPage from "../pages/Client/User Favorites Page";
import { useContext } from "react";
import { quizDataContext } from "../context/QuizDataContext";
import EnglishQuestionsPage from "../pages/Client/Quiz page/English question page";
import AzerbaijanQuestionsPage from "../pages/Client/Quiz page/Azerbaijani question page";
import BlogReadAndComment from "../pages/Client/Blog page/Blog read and comment page";
import FrameStore from "../pages/Client/Frame store";
import AddBlog from "../pages/Client/Blog page/Add Blog";

function ProtectedRoute({ children }) {
    let { quizDataArray } = useContext(quizDataContext);
    console.log(quizDataArray);
    return quizDataArray.length ? children : <Navigate to="/" />;
}

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
                path: '/blog/:id',
                element: <BlogReadAndComment />
            },
            {
                path: '/blog/create',
                element: <AddBlog/>
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
                path: '/quiz/english-question',
                element: <ProtectedRoute><EnglishQuestionsPage /></ProtectedRoute>
            },
            {
                path: '/quiz/azerbaijani-question',
                element: <ProtectedRoute><AzerbaijanQuestionsPage /></ProtectedRoute>
            },
            {
                path: '/favorites',
                element: <UserFavoritesPage />
            },
            {
                path: '/frame-store',
                element: <FrameStore />
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