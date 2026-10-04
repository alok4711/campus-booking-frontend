import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBookableResources, getBookings } from "./api";

function Dashboard() {
    const [resources, setResources] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const resourceData = await getBookableResources();
                setResources(resourceData);

                const bookingData = await getBookings();
                setBookings(bookingData);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>

            <h2>Bookable Resources</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {resources.map((resource) => (
                    <li key={resource.id}>
                        {resource.resourceName} — {resource.resourceType} — Capacity: {resource.capacity}
                    </li>
                ))}
            </ul>

            <h2>Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.bookingPurpose} — {booking.resource?.resourceName} —{" "}
                        {booking.startTime} to {booking.endTime} — {booking.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;