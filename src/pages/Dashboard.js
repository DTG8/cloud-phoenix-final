import React from 'react';
import { Link } from 'react-router-dom';
import { ServerStackIcon, Squares2X2Icon, DocumentTextIcon, BanknotesIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const cardStyle = "bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center";
    const inactiveCardStyle = `${cardStyle} bg-slate-50 opacity-60 cursor-not-allowed`;
    const iconStyle = "h-12 w-12 mb-4";

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Command Center</h1>
            <p className="text-lg text-slate-500 mb-10">Welcome back! Here's your mission control.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link to="/asset-nexus" className={cardStyle}>
                    <ServerStackIcon className={`${iconStyle} text-blue-600`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-700">Asset Intelligence Nexus</h2>
                    <p className="text-slate-500 text-sm">View, manage, and track all your cloud infrastructure assets.</p>
                </Link>
                <div className={inactiveCardStyle}>
                     <Squares2X2Icon className={`${iconStyle} text-slate-400`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-500">Mission Control</h2>
                    <p className="text-slate-400 text-sm">Manage projects and tasks with collaborative Kanban boards. (Coming Soon)</p>
                </div>
                 <div className={inactiveCardStyle}>
                    <DocumentTextIcon className={`${iconStyle} text-slate-400`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-500">SHIFT Log</h2>
                    <p className="text-slate-400 text-sm">Create handover reports and track incidents for seamless team transition. (Coming Soon)</p>
                </div>
                 <div className={inactiveCardStyle}>
                    <BanknotesIcon className={`${iconStyle} text-slate-400`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-500">Cost Analytics</h2>
                    <p className="text-slate-400 text-sm">Analyze cloud spending and identify cost-saving opportunities. (Coming Soon)</p>
                </div>
                 <div className={inactiveCardStyle}>
                    <ShieldCheckIcon className={`${iconStyle} text-slate-400`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-500">Automated Health Checks</h2>
                    <p className="text-slate-400 text-sm">Monitor asset health and receive automated alerts. (Coming Soon)</p>
                </div>
                 <div className={inactiveCardStyle}>
                    <ChartBarIcon className={`${iconStyle} text-slate-400`} />
                    <h2 className="text-xl font-semibold mb-2 text-slate-500">SOP & Runbook Library</h2>
                    <p className="text-slate-400 text-sm">A central repository for Standard Operating Procedures. (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;