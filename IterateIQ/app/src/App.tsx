import { Route, Routes, Navigate } from 'react-router-dom';
import LoginRoute from '@/routes/LoginRoute';
import DashboardRoute from '@/routes/DashboardRoute';

/**
 * Lane A foundation shell. Real routes/auth land in Lane B + C.
 * For now this is a smoke test that React, Tailwind, and the design tokens
 * are wired up correctly.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/dashboard" element={<DashboardRoute />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
