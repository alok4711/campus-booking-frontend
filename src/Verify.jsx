import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "./api";
import AuthLayout from "./AuthLayout";

function Verify() {
    const [params] = useSearchParams();
    const token = params.get("token");
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const alreadyCalled = useRef(false);

    useEffect(() => {
        if (alreadyCalled.current) return;
        alreadyCalled.current = true;

        if (!token) {
            setStatus("error");
            setMessage("This link is missing its verification token.");
            return;
        }

        verifyEmail(token)
            .then(() => setStatus("success"))
            .catch((err) => {
                setStatus("error");
                setMessage(err.message);
            });
    }, [token]);

    if (status === "loading") {
        return (
            <AuthLayout title="Verifying..." subtitle="Hold on while we confirm your email.">
                <p className="muted">This only takes a moment.</p>
            </AuthLayout>
        );
    }

    if (status === "success") {
        return (
            <AuthLayout title="Email verified 🎉" subtitle="Your account is ready.">
                <p className="success">You can now log in.</p>
                <Link to="/login" className="btn btn-block">Go to login</Link>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Verification failed" subtitle="We couldn't verify this link.">
            <p className="error">{message}</p>
            <p className="muted">The link may have expired or already been used.</p>
            <Link to="/login" className="btn btn-block">Go to login</Link>
        </AuthLayout>
    );
}

export default Verify;