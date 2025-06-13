import React, { useState, useContext, useEffect } from 'react';
import AssetContext from '../../context/asset/assetContext'; // <-- THE CORRECTED IMPORT
import { ServerIcon, CubeTransparentIcon, CircleStackIcon, GlobeAltIcon, QuestionMarkCircleIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';

const getAssetIcon = (type) => {
    const iconClass = "h-16 w-16 text-slate-500";
    switch (type) {
        case 'VM (Virtual Machine)':
        case 'Virtual Server':
        case 'Physical Server':
            return <ServerIcon className={iconClass} />;
        case 'Database':
            return <CircleStackIcon className={iconClass} />;
        case 'Load Balancer':
            return <GlobeAltIcon className={iconClass} />;
        case 'Kubernetes Cluster':
            return <CubeTransparentIcon className={iconClass} />;
        default:
            return <QuestionMarkCircleIcon className={iconClass} />;
    }
};

const ViewAssetModal = ({ asset, show, onClose }) => {
    const { updateAsset, deleteAsset } = useContext(AssetContext);
    const [currentAsset, setCurrentAsset] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => { setCurrentAsset(asset); setIsEditing(false); }, [asset]);
    
    if (!show || !currentAsset) return null;

    const handleStatusChange = (e) => {
        const updatedAsset = { ...currentAsset, status: e.target.value };
        setCurrentAsset(updatedAsset);
        updateAsset(updatedAsset);
    };

    const onChange = e => setCurrentAsset({ ...currentAsset, [e.target.name]: e.target.value });

    const onSave = () => {
        updateAsset(currentAsset);
        setIsEditing(false);
    };

    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${currentAsset.name}? This cannot be undone.`)) {
            deleteAsset(currentAsset._id);
            onClose();
        }
    };

    const statusColors = { Active: 'bg-green-100 text-green-800', Inactive: 'bg-yellow-100 text-yellow-800', Decommissioned: 'bg-red-100 text-red-800' };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-8 border w-full max-w-3xl shadow-lg rounded-lg bg-white">
                <div className="flex justify-between items-start mb-6"><div className="flex items-center gap-6">{getAssetIcon(currentAsset.type)}<div>{isEditing ? <input type="text" name="name" value={currentAsset.name} onChange={onChange} className="text-3xl font-bold bg-slate-100 rounded px-2 -ml-2" /> : <h3 className="text-3xl font-bold text-slate-800">{currentAsset.name}</h3>}{isEditing ? <input type="text" name="ipAddress" value={currentAsset.ipAddress} onChange={onChange} className="text-lg text-slate-500 font-mono bg-slate-100 rounded px-2 -ml-2 mt-1" /> : <p className="text-lg text-slate-500 font-mono">{currentAsset.ipAddress}</p>}</div></div><div className="flex flex-col items-end"><label className="text-xs text-slate-500 mb-1">Status</label><select value={currentAsset.status} onChange={handleStatusChange} className={`text-sm font-semibold rounded-full px-3 py-1 border-transparent focus:border-transparent focus:ring-0 ${statusColors[currentAsset.status]}`}><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Decommissioned">Decommissioned</option></select></div></div>
                <div className="border-t pt-6 text-slate-700"><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><h4 className="font-bold mb-2">Configuration</h4><div className="space-y-3 text-sm">
                        <div><p className="font-semibold text-slate-500">Asset Type</p>{isEditing ? <select name="type" value={currentAsset.type} onChange={onChange} className="bg-slate-100 rounded w-full p-1"><option>VM (Virtual Machine)</option><option>Virtual Server</option><option>Physical Server</option><option>Database</option><option>Load Balancer</option><option>Kubernetes Cluster</option><option>Other</option></select> : <p>{currentAsset.type}</p>}</div>
                        <div><p className="font-semibold text-slate-500">Department</p>{isEditing ? <select name="assetDepartment" value={currentAsset.assetDepartment} onChange={onChange} className="bg-slate-100 rounded w-full p-1"><option>Cloud</option><option>Network</option><option>VOIP</option></select> : <p>{currentAsset.assetDepartment}</p>}</div>
                        <div><p className="font-semibold text-slate-500">Cloud Model</p>{isEditing ? <select name="cloudModel" value={currentAsset.cloudModel} onChange={onChange} className="bg-slate-100 rounded w-full p-1"><option>Private Cloud</option><option>Public Cloud</option></select> : <p>{currentAsset.cloudModel}</p>}</div>
                        <div><p className="font-semibold text-slate-500">Provider</p>{isEditing ? <input type="text" name="provider" value={currentAsset.provider || ''} onChange={onChange} className="bg-slate-100 rounded w-full p-1" /> : <p>{currentAsset.provider || 'N/A'}</p>}</div>
                        <div><p className="font-semibold text-slate-500">Location</p>{isEditing ? <input type="text" name="location" value={currentAsset.location || ''} onChange={onChange} className="bg-slate-100 rounded w-full p-1" /> : <p>{currentAsset.location || 'N/A'}</p>}</div>
                    </div></div>
                    <div><h4 className="font-bold mb-2">Credentials</h4><div className="space-y-3 text-sm">
                        <div><p className="font-semibold text-slate-500">Username</p>{isEditing ? <input type="text" name="username" value={currentAsset.username || ''} onChange={onChange} className="bg-slate-100 rounded w-full p-1" /> : <p>{currentAsset.username || 'N/A'}</p>}</div>
                        <div><p className="font-semibold text-slate-500">Password</p><div className="flex items-center gap-2">{isEditing ? <input type={showPassword ? 'text' : 'password'} name="password" value={currentAsset.password || ''} onChange={onChange} className="bg-slate-100 rounded w-full p-1 font-mono" /> : <p className="font-mono">{currentAsset.password ? (showPassword ? currentAsset.password : '••••••••') : 'N/A'}</p>}{currentAsset.password && (<button onClick={() => setShowPassword(!showPassword)} className="text-slate-500 hover:text-slate-800">{showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}</button>)}</div></div>
                    </div></div>
                    <div className="md:col-span-3"><h4 className="font-bold mb-2">Notes</h4>{isEditing ? <textarea name="notes" rows="4" value={currentAsset.notes || ''} onChange={onChange} className="bg-slate-100 rounded w-full p-1 text-sm"></textarea> : <p className="text-sm whitespace-pre-wrap">{currentAsset.notes || 'No notes available.'}</p>}</div>
                </div></div>
                <div className="mt-8 pt-4 border-t flex justify-between items-center">
                    <div>{isEditing && <button onClick={onDelete} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-semibold"><TrashIcon className="h-5 w-5" /> Delete Asset</button>}</div>
                    <div className="flex gap-4">
                        {isEditing ? (<><button onClick={() => { setIsEditing(false); setCurrentAsset(asset); }} className="px-5 py-2 bg-slate-500 text-white text-sm font-bold tracking-wider rounded-md hover:bg-slate-600">Cancel</button><button onClick={onSave} className="px-5 py-2 bg-green-600 text-white text-sm font-bold tracking-wider rounded-md hover:bg-green-700 flex items-center gap-2"><CheckIcon className="h-5 w-5" /> Save Changes</button></>)
                        : (<><button onClick={onClose} className="px-5 py-2 bg-slate-800 text-white text-sm font-bold tracking-wider rounded-md hover:bg-slate-900">Close</button><button onClick={() => setIsEditing(true)} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold tracking-wider rounded-md hover:bg-blue-700 flex items-center gap-2"><PencilIcon className="h-5 w-5" /> Edit</button></>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ViewAssetModal;