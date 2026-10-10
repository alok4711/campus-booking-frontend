import { useOutletContext, useSearchParams } from "react-router-dom";
import BookingForm from "../BookingForm";

function NewBooking() {
    const { resources, refreshBookings } = useOutletContext();
    const [params] = useSearchParams();
    const preselected = params.get("resource") || "";

    return (
        <>
            <div className="page-header">
                <h1>New Booking</h1>
                <p className="muted">Pick a resource and a time slot.</p>
            </div>

            <div className="bento">
                <div className="bento-card span-2">
                    <BookingForm
                        resources={resources}
                        onBookingCreated={refreshBookings}
                        initialResourceId={preselected}
                    />
                </div>

                <div className="bento-card span-2 tone-lilac">
                    <h3 className="card-title">How it works</h3>
                    <ol className="steps">
                        <li>Choose a resource and a time slot.</li>
                        <li>Your request is saved as <strong>Pending</strong>.</li>
                        <li>An HOD or the Dean approves or rejects it.</li>
                        <li>Track the result under <strong>Bookings</strong>.</li>
                    </ol>
                    <p className="muted">Overlapping slots on the same resource are blocked automatically.</p>
                </div>
            </div>
        </>
    );
}

export default NewBooking;