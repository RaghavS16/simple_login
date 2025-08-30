import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/auth/me`, {
          credentials: 'include'
        });
        if (res.ok) setOk(true);
      } catch (err) {
        setOk(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}
