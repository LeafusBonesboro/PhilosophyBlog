import React, { useEffect, useState } from 'react';

function UserStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch login status from backend
        fetch('/auth/status')
            .then(response => response.json())
            .then(data => {
                setLoggedIn(data.logged_in);
                if (data.logged_in) {
                    setUser(data.user);
                }
            });
    }, []);  // Empty array means this effect runs once after component mounts

    if (loggedIn) {
        return (
            <div>
                <p>Welcome, {user.name}!</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not logged in.</p>
                <a href="/auth/login">Login</a>
            </div>
        );
    }
}

function logout() {
    fetch('/auth/logout', { method: 'POST' })
        .then(() => window.location.reload());
}

export default UserStatus;
