import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CloudIcon, CpuChipIcon, BoltIcon } from '@heroicons/react/24/solid';
import AuthContext from '../context/auth/authContext';

const Landing = () => {
    const authContext = useContext(AuthContext);

    if (authContext && authContext.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    
    const AnimatedLogo = () => (
        <div className="relative w-48 h-48 mb-8">
            <CloudIcon className="absolute w-48 h-48 text-blue-500 opacity-80" />
            <svg className="absolute w-48 h-48 animate-pulse" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 135.5C125.148 135.5 145.5 115.148 145.5 90C145.5 64.852 125.148 44.5 100 44.5C74.852 44.5 54.5 64.852 54.5 90C54.5 115.148 74.852 135.5 100 135.5Z" stroke="#FDBA74" strokeWidth="8"/>
                <path d="M100 20C125.5 20 162.923 37.5 174 54.5C185.077 71.5 159 111.5 145.5 135.5C132 159.5 100 180 100 180C100 180 68 159.5 54.5 135.5C41 111.5 14.9231 71.5 26 54.5C37.0769 37.5 74.5 20 100 20Z" stroke="#F97316" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );

    return (
        <div className="h-full bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
            <AnimatedLogo />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                Cloud <span className="text-blue-400">Phoenix</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
                Your unified command center for managing cloud and physical infrastructure with clarity and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                    Login
                </Link>
                <Link to="/register" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                    Register
                </Link>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
                <div className="flex flex-col items-center">
                    <CloudIcon className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold">Centralized Assets</h3>
                    <p className="text-slate-400 mt-2">Track VMs, servers, and databases in one intuitive nexus.</p>
                </div>
                <div className="flex flex-col items-center">
                    <CpuChipIcon className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold">Hybrid Infrastructure</h3>
                    <p className="text-slate-400 mt-2">Manage both public cloud providers and private on-premise hardware.</p>
                </div>
                <div className="flex flex-col items-center">
                    <BoltIcon className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold">Streamlined Ops</h3>
                    <p className="text-slate-400 mt-2">Enhance team productivity with a single source of truth.</p>
                </div>
            </div>
        </div>
    );
};
export default Landing;