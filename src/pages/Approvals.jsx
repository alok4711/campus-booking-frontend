import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { approveBooking, rejectBooking } from "../api";
import { formatDateTime } from "../utils";

function Approvals() {
    const { bookings, refreshBookings, canReview } = useOutletContext();
    const [error, setError] = useState("");

    if (!canReview) {
        return <Navigate to="/overview" replace />;
    }

    const pending = bookings.filter((b) => b.status === "PENDING");

    async function handleReview(id, action) {
        try {
            setError("");
            if (action === "approve") {
                await approveBooking(id);
            } else {
                await rejectBooking(id);
            }
            await refreshBookings();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className="page-header">
                <h1>Approvals</h1>
                <p className="muted">{pending.length} request(s) waiting for a decision.</p>
            </div>

            {error && <p className="error">{error}</p>}

            {pending.length === 0 ? (
                <div className="bento-card tone-mint">Nothing is waiting for your approval. 🎉</div>
            ) : (
                pending.map((b) => (
                    <div className="booking-row" key={b.id}>
                        <div className="booking-main">
                            <div className="row-title">{b.bookingPurpose}</div>
                            <div className="row-sub">
                                {b.resource?.resourceName} · {formatDateTime(b.startTime)} → {formatDateTime(b.endTime)}
                            </div>
                            <div className="row-sub">
                                Requested by {b.bookedBy?.name || b.bookedBy?.email} · {b.attendeesCount} attendees
                            </div>
                        </div>
                        <div className="actions">
                            <button className="btn-approve" onClick={() => handleReview(b.id, "approve")}>Approve</button>
                            <button className="btn-reject" onClick={() => handleReview(b.id, "reject")}>Reject</button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}

export default Approvals;