import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "./api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await registerUser(name, email, password);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (success) {
        return (
            <div>
                <h2>Registration successful</h2>
                <p>Please verify your email before logging in.</p>
                <Link to="/login">Go to login</Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="College email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}

export default Register;