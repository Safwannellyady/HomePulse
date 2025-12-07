import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Appliances from './pages/Appliances';
import ToDOptimizer from './pages/ToDoOptimizer';
import BudgetAndBills from './pages/BudgetAndBills';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import WalletPage from './pages/WalletPage';
import Subscription from './pages/Subscription';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/appliances" element={<ProtectedRoute><Appliances /></ProtectedRoute>} />
      <Route path="/tod-optimization" element={<ProtectedRoute><ToDOptimizer /></ProtectedRoute>} />
      <Route path="/budget" element={<ProtectedRoute><BudgetAndBills /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
      <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
      <Route path="/sustainability" element={<Navigate to="/budget" replace />} />
    </Routes>
  )
}

export default App

