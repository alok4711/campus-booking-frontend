import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getBookableResources, getBookings, getUserRoles, getUserEmail } from "./api";

function Layout() {
    const [resources, setResources] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const roles = getUserRoles();
    const email = getUserEmail();
    const canReview = roles.includes("HOD") || roles.includes("DEAN");

    useEffect(() => {
        async function fetchData() {
            try {
                setResources(await getBookableResources());
                setBookings(await getBookings());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    async function refreshBookings() {
        setBookings(await getBookings());
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
    const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="brand">
                    <span className="brand-icon">🏛️</span>
                    <span>Campus Booking</span>
                </div>

                <nav className="nav">
                    <NavLink to="/overview" className={linkClass}>🏠 Overview</NavLink>
                    <NavLink to="/resources" className={linkClass}>🔬 Resources</NavLink>
                    <NavLink to="/bookings" className={linkClass}>📅 Bookings</NavLink>
                    <NavLink to="/new-booking" className={linkClass}>➕ New Booking</NavLink>
                    {canReview && (
                        <NavLink to="/approvals" className={linkClass}>
                            ✅ Approvals
                            {pendingCount > 0 && <span className="nav-count">{pendingCount}</span>}
                        </NavLink>
                    )}
                </nav>

                <div className="user-section">
                    <div className="user-card">
                        <div className="avatar">{email ? email[0].toUpperCase() : "?"}</div>
                        <div className="user-info">
                            <div className="user-email">{email}</div>
                            <div className="user-roles">{roles.join(" · ")}</div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </aside>

            <main className="main">
                {error && <p className="error">{error}</p>}
                {loading ? (
                    <p className="muted">Loading...</p>
                ) : (
                    <Outlet context={{ resources, bookings, refreshBookings, email, roles, canReview }} />
                )}
            </main>
        </div>
    );
}

export default Layout;