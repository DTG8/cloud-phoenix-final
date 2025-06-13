import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AssetNexus from './pages/AssetNexus';
import Assets from './pages/Assets';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthProvider } from './context/auth/AuthState';
import { AssetProvider } from './context/asset/AssetState';

const App = () => {
  return (
    <AuthProvider>
      <AssetProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-100 font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/asset-nexus" element={<PrivateRoute><AssetNexus /></PrivateRoute>} />
                <Route path="/assets" element={<PrivateRoute><Assets /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" replace /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/landing" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AssetProvider>
    </AuthProvider>
  );
};

export default App;
