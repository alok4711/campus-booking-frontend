import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import Overview from "./pages/Overview";
import Resources from "./pages/Resources";
import Bookings from "./pages/Bookings";
import NewBooking from "./pages/NewBooking";
import Approvals from "./pages/Approvals";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/new-booking" element={<NewBooking />} />
                    <Route path="/approvals" element={<Approvals />} />
                </Route>

                <Route path="*" element={<Navigate to="/overview" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;