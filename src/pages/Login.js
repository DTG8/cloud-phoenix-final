import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { CloudIcon } from '@heroicons/react/24/solid';

const Login = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // Safely destructure properties from context, providing a fallback.
    // This prevents a crash if the context is not yet available on the initial render.
    const { login, error, clearErrors, isAuthenticated } = authContext || {};

    const [user, setUser] = useState({ email: '', password: '' });
    const { email, password } = user;

    // This useEffect hook is now stable and will only run when the specified
    // values change, preventing the previous infinite loop crash.
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        if (error) {
            alert(error);
            // Ensure clearErrors exists before calling it
            if (clearErrors) {
                clearErrors();
            }
        }
    }, [isAuthenticated, error, navigate, clearErrors]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // This check prevents the "dead button" crash by ensuring the login
        // function exists before attempting to call it.
        if (login) {
            if (email === '' || password === '') {
                alert('Please fill in all fields');
            } else {
                login({ email, password });
            }
        } else {
            // This provides clear feedback if the app is in a broken state.
            console.error('Authentication context is not available, cannot log in.');
            alert('A critical error occurred. Please refresh the page and try again.');
        }
    };

    return (
        // THE UI FIX IS HERE: These classes create a fully responsive, full-height,
        // vertically and horizontally centered layout, correcting the "white margin" bug.
        <div className="flex-grow bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <CloudIcon className="mx-auto h-16 w-auto text-blue-500" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Or{' '}
                    <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-700 text-white" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"  className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-700 text-white" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
