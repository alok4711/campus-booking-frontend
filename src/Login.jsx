import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./api";
import AuthLayout from "./AuthLayout";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            navigate("/overview");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Log in with your college email.">
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}

                <label className="field">
                    <span>Email</span>
                    <input
                        type="email"
                        placeholder="you@annauniv.edu"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="field">
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="btn-block">Log in</button>
            </form>

            <p className="auth-switch">
                New here? <Link to="/register">Create an account</Link>
            </p>
        </AuthLayout>
    );
}

export default Login;