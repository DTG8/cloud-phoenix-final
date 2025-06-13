import React, { useContext, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthState';
import Logo from './Logo';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/landing');
    };

    const authLinks = (<Fragment>
            <li className="mr-6"><span className="text-slate-300">Hello, {user && user.name}</span></li>
            <li><button onClick={onLogout} className="text-slate-300 hover:text-white transition-colors">Logout</button></li>
        </Fragment>);

    const guestLinks = (<Fragment>
            <li className="mr-6"><Link to='/register' className="text-slate-300 hover:text-white transition-colors">Register</Link></li>
            <li><Link to='/login' className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors">Login</Link></li>
        </Fragment>);

    return (
        <nav className="bg-slate-800 text-slate-200 p-4 shadow-md sticky top-0 z-40">
            <div className="container mx-auto flex justify-between items-center">
                <Logo />
                <ul className="flex items-center">{isAuthenticated ? authLinks : guestLinks}</ul>
            </div>
        </nav>
    );
};
export default Navbar;