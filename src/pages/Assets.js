import React, { useState, useEffect, useContext, useMemo } from 'react';
import AssetContext from '../context/asset/AssetState';
import AuthContext from '../context/auth/AuthState';
import AddAssetModal from '../components/assets/AddAssetModal';
import ViewAssetModal from '../components/assets/ViewAssetModal';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center mt-20">
        <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-center mt-4 text-xl text-slate-600">Loading Assets...</h2>
    </div>
);

const Assets = () => {
    const { assets, loading: assetsLoading, getAssets } = useContext(AssetContext);
    const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
    const location = useLocation();
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'All',
        type: 'All',
        provider: 'All',
        department: location.state?.departmentFilter || 'All'
    });
    
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            getAssets();
        }
    }, [isAuthenticated, authLoading, getAssets]);

    const handleRowClick = (asset) => {
        setSelectedAsset(asset);
        setShowViewModal(true);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredAssets = useMemo(() => {
        return assets.filter(asset => 
            (searchTerm === '' || asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filters.status === 'All' || asset.status === filters.status) &&
            (filters.type === 'All' || asset.type === filters.type) &&
            (filters.provider === 'All' || asset.provider === filters.provider) &&
            (filters.department === 'All' || asset.assetDepartment === filters.department)
        );
    }, [assets, searchTerm, filters]);

    const statusColors = { Active: 'bg-green-100 text-green-800', Inactive: 'bg-yellow-100 text-yellow-800', Decommissioned: 'bg-red-100 text-red-800' };

    if (authLoading || assetsLoading) return <LoadingSpinner />;

    const uniqueTypes = ['All', ...new Set(assets.map(a => a.type).filter(Boolean))];
    const uniqueProviders = ['All', ...new Set(assets.map(a => a.provider).filter(Boolean))];

    return (
        <div className="container mx-auto px-4 py-8">
            <AddAssetModal show={showAddModal} onClose={() => setShowAddModal(false)} />
            {selectedAsset && <ViewAssetModal asset={selectedAsset} show={showViewModal} onClose={() => setShowViewModal(false)} />}
            
            <div className="mb-8">
                <Link to="/asset-nexus" className="text-sm text-blue-600 hover:underline mb-2 inline-flex items-center gap-1 group">
                    <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Asset Nexus
                </Link>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">
                        {filters.department === 'All' ? 'All Assets' : `${filters.department} Assets`}
                    </h1>
                    <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out self-start md:self-center">
                        + Add New Asset
                    </button>
                </div>
            </div>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2"><label className="block text-sm font-medium text-slate-600 mb-1">Search</label><div className="relative"><MagnifyingGlassIcon className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-3" /><input type="text" placeholder="Search by name or IP..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full shadow-sm border-slate-300 rounded-md" /></div></div>
                    <div><label className="block text-sm font-medium text-slate-600 mb-1">Status</label><select name="status" value={filters.status} onChange={handleFilterChange} className="w-full shadow-sm border-slate-300 rounded-md"><option>All</option><option>Active</option><option>Inactive</option><option>Decommissioned</option></select></div>
                    <div><label className="block text-sm font-medium text-slate-600 mb-1">Asset Type</label><select name="type" value={filters.type} onChange={handleFilterChange} className="w-full shadow-sm border-slate-300 rounded-md">{uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-slate-600 mb-1">Provider</label><select name="provider" value={filters.provider} onChange={handleFilterChange} className="w-full shadow-sm border-slate-300 rounded-md">{uniqueProviders.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead><tr className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold"><th className="px-5 py-3 border-b-2 border-slate-200 text-left">Name</th><th className="px-5 py-3 border-b-2 border-slate-200 text-left hidden md:table-cell">IP Address</th><th className="px-5 py-3 border-b-2 border-slate-200 text-left">Type</th><th className="px-5 py-3 border-b-2 border-slate-200 text-left">Cloud Model</th><th className="px-5 py-3 border-b-2 border-slate-200 text-left">Location</th><th className="px-5 py-3 border-b-2 border-slate-200 text-center">Status</th></tr></thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map(asset => (
                                <tr key={asset._id} onClick={() => handleRowClick(asset)} className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer">
                                    <td className="px-5 py-4 text-sm"><p className="text-slate-900 font-semibold whitespace-no-wrap">{asset.name}</p><p className="text-slate-600 whitespace-no-wrap md:hidden">{asset.ipAddress}</p></td>
                                    <td className="px-5 py-4 text-sm hidden md:table-cell"><p className="text-slate-900 font-mono whitespace-no-wrap">{asset.ipAddress}</p></td>
                                    <td className="px-5 py-4 text-sm"><p className="text-slate-900 whitespace-no-wrap">{asset.type}</p></td>
                                    <td className="px-5 py-4 text-sm"><p className="text-slate-900 whitespace-no-wrap">{asset.cloudModel}</p></td>
                                    <td className="px-5 py-4 text-sm"><p className="text-slate-900 whitespace-no-wrap">{asset.location || 'N/A'}</p></td>
                                    <td className="px-5 py-4 text-sm text-center"><span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full text-xs ${statusColors[asset.status]}`}>{asset.status}</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center py-10 text-slate-500">No assets match your criteria.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Assets;