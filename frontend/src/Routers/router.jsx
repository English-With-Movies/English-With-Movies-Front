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
import OtherUserPage from "../pages/Client/Other User Page";
import FrameTable from "../pages/Admin/Admin Tables/Frame Table";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import BlogTable from "../pages/Admin/Admin Tables/Blog Table";
import FeedbackTable from "../pages/Admin/Admin Tables/Feedback Table";
import GenreTable from "../pages/Admin/Admin Tables/Genre Table";
import SubscriptionTable from "../pages/Admin/Admin Tables/Subscription Table";
import SettingsTable from "../pages/Admin/Admin Tables/Settings Table";
import LevelTable from "../pages/Admin/Admin Tables/Level Table";
import MovieTable from "../pages/Admin/Admin Tables/Movie Table";
import TodaysPointsRanking from "../pages/Client/Today's points ranking";
import FeedbackPage from "../pages/Client/Feedback page";
import UserReportTable from "../pages/Admin/Admin Tables/User Report Table";
import WordTable from "../pages/Admin/Admin Tables/Word Table";

function ProtectedRoute({ children }) {
    let { quizDataArray } = useContext(quizDataContext);
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
                path: '/points-ranking',
                element: <PointsRanking />
            },
            {
                path: '/todays-points-ranking',
                element: <TodaysPointsRanking />
            },
            {
                path: '/streak-ranking',
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
                element: <AddBlog />
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
                path: '/user/:userName',
                element: <OtherUserPage />
            },
            {
                path: '/feedback',
                element: <FeedbackPage />
            },
            {
                path: '/*',
                element: <NotFound />
            }
        ]
    },
    {
        path: "/manage",
        element: <ProtectedAdminRoute />,
        children: [
            {
                path: "",
                element: <Navigate to="dashboard" replace />
            },
            {
                path: "dashboard",
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
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
                    },
                    {
                        path: 'tables/user-report-table',
                        element: <UserReportTable />
                    },
                    {
                        path: "tables/frame-table",
                        element: <FrameTable />
                    },
                    {
                        path: "tables/blog-table",
                        element: <BlogTable />
                    },
                    {
                        path: "tables/feedback-table",
                        element: <FeedbackTable />,
                    },
                    {
                        path: "tables/genre-table",
                        element: <GenreTable />
                    },
                    {
                        path: "tables/level-table",
                        element: <LevelTable />
                    },
                    {
                        path: "tables/settings-table",
                        element: <SettingsTable />,
                    },
                    {
                        path: "tables/subscription-table",
                        element: <SubscriptionTable />
                    },
                    {
                        path: "tables/movie-table",
                        element: <MovieTable />
                    },
                    {
                        path: "tables/word-table",
                        element: <WordTable />
                    }
                ]
            }
        ]
    },

]

export default ROUTES