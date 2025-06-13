import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import AuthContext from '../context/auth/authContext';

const Login = () => {
    const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        return () => {
            if (error) {
                clearErrors();
            }
        };
    }, [isAuthenticated, error, navigate, clearErrors]);
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            console.log('Please fill in all fields');
        } else {
            login({ email, password });
        }
    };

    return (
        <div className="h-full bg-slate-900 text-white flex flex-col items-center justify-center p-6">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <CloudIcon className="h-10 w-10 text-blue-500" />
                        <h1 className="text-3xl font-bold tracking-tight">Cloud Phoenix</h1>
                    </div>
                    <p className="text-slate-400">Sign in to access your command center.</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}
                
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="relative">
                        <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email Address"
                            required
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500">
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;