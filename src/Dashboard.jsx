import { useState, useEffect } from "react";
import { getBookableResources } from "./api";

function Dashboard() {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBookableResources();
                setResources(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Bookable Resources</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {resources.map((resource) => (
                    <li key={resource.id}>
                        {resource.resourceName} — {resource.resourceType} — Capacity: {resource.capacity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;