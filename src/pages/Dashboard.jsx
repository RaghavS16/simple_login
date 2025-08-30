import React from 'react';

export default function Dashboard(){
  return (
    <div>
      <h2>Dashboard (protected)</h2>
      <button onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        window.location.href = '/login';
      }}>Logout</button>
    </div>
  )
}
