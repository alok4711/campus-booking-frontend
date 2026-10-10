import { Link, useOutletContext } from "react-router-dom";

const TYPE_STYLE = {
    AUDITORIUM: { icon: "🎭", tone: "tone-lilac" },
    LAB: { icon: "🔬", tone: "tone-sky" },
    CLASSROOM: { icon: "📚", tone: "tone-mint" },
    EXAM_HALL: { icon: "📝", tone: "tone-amber" },
};

function Resources() {
    const { resources } = useOutletContext();

    return (
        <>
            <div className="page-header">
                <h1>Resources</h1>
                <p className="muted">Auditoriums, labs, classrooms and exam halls you can book.</p>
            </div>

            {resources.length === 0 ? (
                <p className="muted">No resources available for your department.</p>
            ) : (
                <div className="card-grid">
                    {resources.map((r) => {
                        const style = TYPE_STYLE[r.resourceType] || { icon: "📍", tone: "tone-lilac" };
                        return (
                            <div key={r.id} className={`bento-card resource-card ${style.tone}`}>
                                <div className="resource-icon">{style.icon}</div>
                                <h3>{r.resourceName}</h3>
                                <p className="muted">{r.resourceType.replace("_", " ")}</p>
                                <div className="resource-meta">
                                    <span>👥 {r.capacity}</span>
                                    {r.requiresPayment && <span>💳 Paid</span>}
                                    {r.status !== "ACTIVE" && <span>🛠️ Unavailable</span>}
                                </div>
                                <Link to={`/new-booking?resource=${r.id}`} className="btn">Book this</Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Resources;