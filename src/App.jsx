import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "*", element: <Login /> }, // fallback
]);

export default function App() {
  return <RouterProvider router={router} />;
}
