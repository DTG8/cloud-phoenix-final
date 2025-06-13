import React from 'react';
import { Link } from 'react-router-dom';
import { WindowIcon, CloudIcon, ServerStackIcon, PhoneIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const AssetNexus = () => {
    const cardStyle = "bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center";
    const iconStyle = "h-16 w-16 mb-5 text-blue-600";

    return (
        <div className="container mx-auto px-4 py-8">
             <Link to="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center gap-1 group">
                <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Main Dashboard
             </Link>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Asset Intelligence Nexus</h1>
            <p className="text-lg text-slate-500 mb-10">Select an asset category to view or manage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link to="/assets" state={{ departmentFilter: 'All' }} className={cardStyle}>
                    <WindowIcon className={iconStyle} />
                    <h2 className="text-2xl font-semibold mb-2 text-slate-700">All Assets</h2>
                    <p className="text-slate-500 text-sm">View the complete inventory of all registered assets.</p>
                </Link>
                <Link to="/assets" state={{ departmentFilter: 'Cloud' }} className={cardStyle}>
                    <CloudIcon className={iconStyle} />
                    <h2 className="text-2xl font-semibold mb-2 text-slate-700">Cloud Assets</h2>
                    <p className="text-slate-500 text-sm">Filter for assets deployed on public cloud providers.</p>
                </Link>
                <Link to="/assets" state={{ departmentFilter: 'Network' }} className={cardStyle}>
                    <ServerStackIcon className={iconStyle} />
                    <h2 className="text-2xl font-semibold mb-2 text-slate-700">Network Assets</h2>
                    <p className="text-slate-500 text-sm">Filter for networking hardware and infrastructure.</p>
                </Link>
                <Link to="/assets" state={{ departmentFilter: 'VOIP' }} className={cardStyle}>
                    <PhoneIcon className={iconStyle} />
                    <h2 className="text-2xl font-semibold mb-2 text-slate-700">VOIP Assets</h2>
                    <p className="text-slate-500 text-sm">Filter for Voice over IP and telephony equipment.</p>
                </Link>
            </div>
        </div>
    );
};

export default AssetNexus;
