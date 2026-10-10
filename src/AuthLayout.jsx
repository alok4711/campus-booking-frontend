function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="auth-page">
            <div className="auth-hero">
                <div className="brand">
                    <span className="brand-icon">🏛️</span>
                    <span>Campus Booking</span>
                </div>

                <div>
                    <h1>Book campus spaces without the back-and-forth.</h1>
                    <p>Labs, halls and classrooms, with live availability and quick approvals.</p>

                    <div className="hero-tiles">
                        <div className="hero-tile">🔬<strong>Live schedules</strong><span>See what's free</span></div>
                        <div className="hero-tile">⚡<strong>No clashes</strong><span>Overlaps blocked</span></div>
                        <div className="hero-tile">✅<strong>Fast approvals</strong><span>HOD and Dean review</span></div>
                        <div className="hero-tile">🏛️<strong>Every venue</strong><span>Halls, labs, exams</span></div>
                    </div>
                </div>

                <p className="hero-foot">Built for your department, ready for the whole university.</p>
            </div>

            <div className="auth-panel">
                <div className="auth-form-wrap">
                    <h2>{title}</h2>
                    <p className="muted">{subtitle}</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;