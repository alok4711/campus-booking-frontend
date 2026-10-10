import { Link, useOutletContext } from "react-router-dom";
import { formatDateTime } from "../utils";

function Overview() {
    const { resources, bookings, email, canReview } = useOutletContext();

    const rawName = email.split("@")[0];
    const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const mine = bookings.filter((b) => b.bookedBy?.email === email);
    const myApproved = mine.filter((b) => b.status === "APPROVED").length;
    const pendingNumber = canReview
        ? bookings.filter((b) => b.status === "PENDING").length
        : mine.filter((b) => b.status === "PENDING").length;
    const pendingLabel = canReview ? "Awaiting your review" : "My pending requests";

    const now = new Date();
    const upcoming = bookings
        .filter((b) => b.status === "APPROVED" && new Date(b.startTime) >= now)
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        .slice(0, 4);

    const recent = [...mine].sort((a, b) => b.id - a.id).slice(0, 4);

    return (
        <>
            <div className="page-header">
                <h1>Overview</h1>
                <p className="muted">Here's what's happening across your campus resources.</p>
            </div>

            <div className="bento">
                <div className="bento-card hero span-2">
                    <div>
                        <h2>Welcome back, {displayName} 👋</h2>
                        <p>Book labs, halls and classrooms in a few clicks.</p>
                    </div>
                    <div className="hero-actions">
                        <Link to="/new-booking" className="btn btn-light">+ New booking</Link>
                        {canReview && <Link to="/approvals" className="btn btn-ghost">Review requests</Link>}
                    </div>
                </div>

                <div className="bento-card tone-sky">
                    <div className="stat-icon">🏛️</div>
                    <div className="stat-number">{resources.length}</div>
                    <div className="stat-label">Resources</div>
                </div>

                <div className="bento-card tone-lilac">
                    <div className="stat-icon">📅</div>
                    <div className="stat-number">{mine.length}</div>
                    <div className="stat-label">My bookings</div>
                </div>

                <div className="bento-card tone-mint">
                    <div className="stat-icon">✅</div>
                    <div className="stat-number">{myApproved}</div>
                    <div className="stat-label">Approved</div>
                </div>

                <div className="bento-card tone-amber">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-number">{pendingNumber}</div>
                    <div className="stat-label">{pendingLabel}</div>
                </div>

                <div className="bento-card span-2">
                    <h3 className="card-title">Upcoming approved bookings</h3>
                    {upcoming.length === 0 ? (
                        <p className="muted">Nothing scheduled yet.</p>
                    ) : (
                        upcoming.map((b) => (
                            <div className="row" key={b.id}>
                                <div>
                                    <div className="row-title">{b.bookingPurpose}</div>
                                    <div className="row-sub">
                                        {b.resource?.resourceName} · {formatDateTime(b.startTime)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bento-card span-2">
                    <h3 className="card-title">My recent requests</h3>
                    {recent.length === 0 ? (
                        <p className="muted">You haven't made any bookings yet.</p>
                    ) : (
                        recent.map((b) => (
                            <div className="row" key={b.id}>
                                <div>
                                    <div className="row-title">{b.bookingPurpose}</div>
                                    <div className="row-sub">{b.resource?.resourceName}</div>
                                </div>
                                <span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="bento-card span-4">
                    <h3 className="card-title">Resources</h3>
                    {resources.length === 0 ? (
                        <p className="muted">No resources available.</p>
                    ) : (
                        resources.slice(0, 5).map((r) => (
                            <div className="row" key={r.id}>
                                <div>
                                    <div className="row-title">{r.resourceName}</div>
                                    <div className="row-sub">{r.resourceType.replace("_", " ")}</div>
                                </div>
                                <span className="muted">👥 {r.capacity}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Overview;