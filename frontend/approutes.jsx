import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomeNavLogin from "./HomeNavLogin";
import MaterialDetailPage from "./MaterialDetailPage";
import UploadMaterialPage from "./UploadMaterialPage";
import AdminDashboard from "./AdminDashboard";
import UserProfilePage from "./UserProfilePage";

function ProtectedRoute({ children, adminOnly }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/me`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">正在加载身份信息...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && !user.is_admin) return <Navigate to="/" replace />;

  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeNavLogin />} />
        <Route path="/upload" element={<UploadMaterialPage />} />
        <Route path="/material/:id" element={<MaterialDetailPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
