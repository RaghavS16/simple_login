import React from 'react';

const BACKEND_URL = "https://my-auth-api.eba-5jfesjf6.ap-south-1.elasticbeanstalk.com";

export default function Dashboard() {
  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Dashboard (protected)</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
