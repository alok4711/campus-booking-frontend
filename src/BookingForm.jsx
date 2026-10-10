import { useState } from "react";
import { createBooking } from "./api";

function BookingForm({ resources, onBookingCreated }) {
    const [bookingPurpose, setBookingPurpose] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [attendeesCount, setAttendeesCount] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const selectedResource = resources.find((r) => r.id === Number(resourceId));

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (selectedResource && Number(attendeesCount) > selectedResource.capacity) {
            setError(`${selectedResource.resourceName} holds only ${selectedResource.capacity} people`);
            return;
        }

        try {
            await createBooking({
                bookingPurpose,
                startTime,
                endTime,
                attendeesCount: Number(attendeesCount),
                resourceId: Number(resourceId),
            });

            setBookingPurpose("");
            setStartTime("");
            setEndTime("");
            setAttendeesCount("");
            setResourceId("");
            setSuccess("Booking request submitted. It is now pending approval.");
            onBookingCreated();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>New Booking</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <select value={resourceId} onChange={(e) => setResourceId(e.target.value)} required>
                <option value="">Select a resource</option>
                {resources.map((r) => (
                    <option key={r.id} value={r.id}>
                        {r.resourceName} ({r.resourceType}, capacity {r.capacity})
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Purpose"
                value={bookingPurpose}
                onChange={(e) => setBookingPurpose(e.target.value)}
                required
            />
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            <input
                type="number"
                min="1"
                placeholder="Attendees"
                value={attendeesCount}
                onChange={(e) => setAttendeesCount(e.target.value)}
                required
            />
            <button type="submit">Book</button>
        </form>
    );
}

export default BookingForm;