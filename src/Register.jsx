import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser, getDepartments } from "./api";
import AuthLayout from "./AuthLayout";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getDepartments()
            .then(setDepartments)
            .catch((err) => setError(err.message));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await registerUser(name, email, password, Number(departmentId));
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (success) {
        return (
            <AuthLayout title="You're registered 🎉" subtitle="One more step before you can log in.">
                <p className="success">We've sent a verification link to your email. Open it to activate your account.</p>
                <Link to="/login" className="btn btn-block">Go to login</Link>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Create your account" subtitle="Use your college email address.">
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}

                <label className="field">
                    <span>Full name</span>
                    <input type="text" placeholder="Your name" autoComplete="name"
                        value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label className="field">
                    <span>College email</span>
                    <input type="email" placeholder="you@student.annauniv.edu" autoComplete="email"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label className="field">
                    <span>Department</span>
                    <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
                        <option value="">Select your department</option>
                        {departments.map((d) => (
                            <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                        ))}
                    </select>
                </label>

                <label className="field">
                    <span>Password</span>
                    <input type="password" placeholder="Choose a password" autoComplete="new-password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type="submit" className="btn-block">Register</button>
            </form>

            <p className="auth-switch">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </AuthLayout>
    );
}

export default Register;