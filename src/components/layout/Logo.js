import React from 'react';
import { Link } from 'react-router-dom';
import { CloudIcon } from '@heroicons/react/24/solid';

const Logo = () => (
    <Link to='/' className="flex items-center gap-3 group">
        <div className="relative w-10 h-10">
            <svg className="absolute w-10 h-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 20C125.5 20 162.923 37.5 174 54.5C185.077 71.5 159 111.5 145.5 135.5C132 159.5 100 180 100 180C100 180 68 159.5 54.5 135.5C41 111.5 14.9231 71.5 26 54.5C37.0769 37.5 74.5 20 100 20Z" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <CloudIcon className="absolute w-10 h-10 text-blue-500 transition-transform duration-300 ease-in-out group-hover:scale-95"/>
        </div>
        <div>
            <span className="text-2xl font-bold text-white tracking-wider">Cloud Phoenix</span>
            {process.env.REACT_APP_COMPANY_NAME && (
                <p className="text-xs text-slate-400 font-light -mt-1">
                    for {process.env.REACT_APP_COMPANY_NAME}
                </p>
            )}
        </div>
    </Link>
);

export default Logo;
