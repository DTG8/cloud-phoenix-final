import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const AnimatedLoadingScreen = () => (
    <>
        <style>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } } .animate-float { animation: float 3s ease-in-out infinite; }`}</style>
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100">
            <svg className="w-24 h-24 text-blue-500 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>
            <p className="mt-4 text-lg text-slate-600 font-semibold tracking-wide">Connecting to Cloud Phoenix...</p>
        </div>
    </>
);

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <AnimatedLoadingScreen />;
    return isAuthenticated ? children : <Navigate to="/landing" state={{ from: location }} replace />;
};

export default PrivateRoute;
