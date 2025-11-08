import Helmet from 'react-helmet'
export default function AdminDashboard() {
    return (
        <>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <div className="min-h-[85vh] text-[var(--text-color)]">
                admin dashboard
            </div>
        </>
    )
}