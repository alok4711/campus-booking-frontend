const BASE_URL = "http://localhost:8080/api";

export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
    }

    return response.json();
}

export async function getBookableResources() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/bookable-resources`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch resources");
    }

    return response.json();
}

export async function getBookings() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/bookings`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return response.json();
}

export async function createBooking(bookingData) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed");
    }

    return response.json();
}

export async function approveBooking(id) {
    return updateBookingStatus(id, "approve");
}

export async function rejectBooking(id) {
    return updateBookingStatus(id, "reject");
}

async function updateBookingStatus(id, action) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/bookings/${id}/${action}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("You are not allowed to do this, or the request failed");
    }

    return response.json();
}

export function getUserRoles() {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        return payload.roles || [];
    } catch {
        return [];
    }
}

export function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token) return "";

    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64)).sub || "";
    } catch {
        return "";
    }
}

export async function registerUser(name, email, password) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
    }

    return response.json();
}