import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { CloudIcon } from '@heroicons/react/24/solid';

const Register = () => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        if (error) {
            alert(error);
            clearErrors();
        }
    }, [error, isAuthenticated, navigate, clearErrors]);

    const [user, setUser] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = user;
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!name || !email || !password) { alert('Please enter all fields'); }
        else if (password !== password2) { alert('Passwords do not match'); }
        else { register({ name, email, password }); }
    };

    return (
        <div className="min-h-full flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <CloudIcon className="mx-auto h-16 w-auto text-blue-500" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your Account</h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">Sign in</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div><label htmlFor="name" className="sr-only">Full Name</label><input id="name" name="name" type="text" value={name} onChange={onChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm rounded-t-md"/></div>
                        <div><label htmlFor="email-address" className="sr-only">Email address</label><input id="email-address" name="email" type="email" value={email} onChange={onChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"/></div>
                        <div><label htmlFor="password"  className="sr-only">Password</label><input id="password" name="password" type="password" value={password} onChange={onChange} required minLength="6" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"/></div>
                        <div><label htmlFor="password2"  className="sr-only">Confirm Password</label><input id="password2" name="password2" type="password" value={password2} onChange={onChange} required minLength="6" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm rounded-b-md"/></div>
                    </div>
                    <div><button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button></div>
                </form>
            </div>
        </div>
    );
};
export default Register;