import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import AuthContext from '../context/auth/authContext';

const Register = () => {
    const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        return () => {
            if (error) clearErrors();
        };
    }, [isAuthenticated, error, navigate, clearErrors]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '' // for confirmation
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLocalError(null);
        if (name === '' || email === '' || password === '') {
            setLocalError('Please enter all fields');
        } else if (password !== password2) {
            setLocalError('Passwords do not match');
        } else {
            register({ name, email, password });
        }
    };

    return (
        <div className="flex-grow bg-slate-900 text-white flex flex-col items-center justify-center p-6">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <CloudIcon className="h-10 w-10 text-blue-500" />
                        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                    </div>
                    <p className="text-slate-400">Join Cloud Phoenix and get started.</p>
                </div>

                {(error || localError) && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-md mb-4 text-center">
                        {error || localError}
                    </div>
                )}
                
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="relative">
                        <UserIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name" required className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div className="relative">
                        <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required minLength="6" className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password" required minLength="6" className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500">
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;