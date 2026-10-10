import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDateTime } from "../utils";

const STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED"];

function Bookings() {
    const { bookings, email } = useOutletContext();
    const [view, setView] = useState("mine");
    const [status, setStatus] = useState("ALL");

    const list = bookings
        .filter((b) => view === "all" || b.bookedBy?.email === email)
        .filter((b) => status === "ALL" || b.status === status)
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return (
        <>
            <div className="page-header">
                <h1>Bookings</h1>
                <p className="muted">Your requests, and the schedule across resources.</p>
            </div>

            <div className="toolbar">
                <div className="segmented">
                    <button className={view === "mine" ? "active" : ""} onClick={() => setView("mine")}>
                        Mine
                    </button>
                    <button className={view === "all" ? "active" : ""} onClick={() => setView("all")}>
                        All bookings
                    </button>
                </div>

                <div className="segmented">
                    {STATUSES.map((s) => (
                        <button key={s} className={status === s ? "active" : ""} onClick={() => setStatus(s)}>
                            {s === "ALL" ? "All status" : s.charAt(0) + s.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {list.length === 0 ? (
                <p className="muted">No bookings match these filters.</p>
            ) : (
                list.map((b) => {
                    const start = new Date(b.startTime);
                    return (
                        <div className="booking-row" key={b.id}>
                            <div className="date-chip">
                                <strong>{start.getDate()}</strong>
                                <span>{start.toLocaleString("en-IN", { month: "short" })}</span>
                            </div>
                            <div className="booking-main">
                                <div className="row-title">{b.bookingPurpose}</div>
                                <div className="row-sub">
                                    {b.resource?.resourceName} · {formatDateTime(b.startTime)} → {formatDateTime(b.endTime)}
                                </div>
                                {view === "all" && b.bookedBy?.name && (
                                    <div className="row-sub">by {b.bookedBy.name}</div>
                                )}
                            </div>
                            <span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span>
                        </div>
                    );
                })
            )}
        </>
    );
}

export default Bookings;