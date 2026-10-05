import { useState } from "react";
import { createBooking } from "./api";

function BookingForm({ onBookingCreated }) {
    const [bookingPurpose, setBookingPurpose] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [attendeesCount, setAttendeesCount] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await createBooking({
                bookingPurpose,
                startTime,
                endTime,
                attendeesCount: Number(attendeesCount),
                resourceId: Number(resourceId),
            });
            onBookingCreated();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>New Booking</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Purpose"
                value={bookingPurpose}
                onChange={(e) => setBookingPurpose(e.target.value)}
            />
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <input
                type="number"
                placeholder="Attendees"
                value={attendeesCount}
                onChange={(e) => setAttendeesCount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Resource ID"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
            />
            <button type="submit">Book</button>
        </form>
    );
}

export default BookingForm;