import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import {
    getBookableResources,
    getBookings,
    approveBooking,
    rejectBooking,
    getUserRoles,
    getUserEmail,
} from "./api";
import { formatDateTime } from "./utils";

function Dashboard() {
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

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const pendingBookings = bookings.filter((b) => b.status === "PENDING");
    const otherBookings = canReview ? bookings.filter((b) => b.status !== "PENDING") : bookings;

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <header>
                <div>
                    <strong>{email}</strong> — {roles.join(", ") || "No role"}
                </div>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {canReview && (
                <section>
                    <h2>Pending approval ({pendingBookings.length})</h2>
                    {pendingBookings.length === 0 ? (
                        <p>Nothing is waiting for your approval.</p>
                    ) : (
                        <ul>
                            {pendingBookings.map((booking) => (
                                <li key={booking.id}>
                                    {booking.bookingPurpose} — {booking.resource?.resourceName} —{" "}
                                    {formatDateTime(booking.startTime)} to {formatDateTime(booking.endTime)}
                                    {" "}
                                    <button onClick={() => handleReview(booking.id, "approve")}>Approve</button>
                                    <button onClick={() => handleReview(booking.id, "reject")}>Reject</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            <section>
                <h2>Bookable Resources</h2>
                {resources.length === 0 ? (
                    <p>No resources available for your department.</p>
                ) : (
                    <ul>
                        {resources.map((resource) => (
                            <li key={resource.id}>
                                {resource.resourceName} — {resource.resourceType} — Capacity: {resource.capacity}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>{canReview ? "Booking history" : "Bookings"}</h2>
                {otherBookings.length === 0 ? (
                    <p>No bookings yet.</p>
                ) : (
                    <ul>
                        {otherBookings.map((booking) => (
                            <li key={booking.id}>
                                {booking.bookingPurpose} — {booking.resource?.resourceName} —{" "}
                                {formatDateTime(booking.startTime)} to {formatDateTime(booking.endTime)} —{" "}
                                {booking.status}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <BookingForm resources={resources} onBookingCreated={refreshBookings} />
            </section>
        </div>
    );
}

export default Dashboard;