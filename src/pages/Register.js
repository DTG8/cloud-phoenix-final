// ===============================================================
// || FILE: src/pages/Register.js (Definitive Version)
// ===============================================================
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { CloudIcon } from '@heroicons/react/24/solid';

const Register = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // Destructure properties from context safely, providing a fallback.
    const { register, error, clearErrors, isAuthenticated } = authContext || {};

    const [user, setUser] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = user;

    // This useEffect hook now has a stable dependency array.
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        if (error) {
            alert(error);
            if (clearErrors) {
                clearErrors();
            }
        }
    }, [isAuthenticated, error, navigate, clearErrors]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
        // This check prevents the "dead button" crash.
        if (register) {
            if (!name || !email || !password) {
                alert('Please enter all fields');
            } else if (password !== password2) {
                alert('Passwords do not match');
            } else {
                register({ name, email, password });
            }
        } else {
            console.error('Auth context not available, cannot register.');
            alert('A critical error occurred. Please refresh the page.');
        }
    };

    return (
        // These classes create a fully responsive, full-height, centered layout.
        <div className="flex-grow bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <CloudIcon className="mx-auto h-16 w-auto text-blue-500" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your Account</h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                            <div className="mt-1"><input id="name" name="name" type="text" value={name} onChange={onChange} required className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
                            <div className="mt-1"><input id="email" name="email" type="email" value={email} onChange={onChange} required className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                        </div>
                        <div>
                            <label htmlFor="password"  className="block text-sm font-medium text-slate-300">Password</label>
                            <div className="mt-1"><input id="password" name="password" type="password" value={password} onChange={onChange} required minLength="6" className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                        </div>
                        <div>
                            <label htmlFor="password2"  className="block text-sm font-medium text-slate-300">Confirm Password</label>
                            <div className="mt-1"><input id="password2" name="password2" type="password" value={password2} onChange={onChange} required minLength="6" className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Register;
