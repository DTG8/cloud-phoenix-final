import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { CloudIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const Login = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // Safely destructure properties from context. This prevents a crash if the
    // context is not yet available on the initial render.
    const { login, error, clearErrors, isAuthenticated } = authContext || {};

    const [user, setUser] = useState({ email: '', password: '' });
    const { email, password } = user;

    // This useEffect hook is stable and will only run when these specific values change.
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
            console.error('Authentication context is not available, cannot log in.');
            alert('A critical error occurred. Please refresh the page and try again.');
        }
    };

    return (
        // This new layout uses a responsive split-screen design.
        <div className="flex-grow flex md:flex-row flex-col">
            {/* Left Side - Branding */}
            <div className="w-full md:w-1/2 bg-slate-900 flex flex-col justify-center items-center p-8 text-center text-white">
                <CloudIcon className="w-24 h-24 text-blue-500 mb-4" />
                <h1 className="text-4xl font-bold">Welcome Back</h1>
                <p className="text-slate-300 mt-2 max-w-sm">Sign in to access your command center and manage your infrastructure with precision.</p>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-slate-100">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Or{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                create a new account
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={onChange} placeholder="Email address" className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="password"  className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={onChange} placeholder="Password" className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <ArrowRightIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                                </span>
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
