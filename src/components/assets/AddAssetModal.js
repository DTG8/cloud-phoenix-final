import React, { useState, useContext } from 'react';
import AssetContext from '../../context/asset/assetContext';

const AddAssetModal = ({ show, onClose }) => {
    const { addAsset } = useContext(AssetContext);
    const [asset, setAsset] = useState({ name: '', ipAddress: '', type: 'VM (Virtual Machine)', cloudModel: 'Private Cloud', provider: '', otherProvider: '', location: '', username: '', password: '', notes: '', assetDepartment: 'Cloud' });
    const { name, ipAddress, type, cloudModel, provider, otherProvider, location, username, password, notes, assetDepartment } = asset;

    const onChange = e => {
        const { name, value } = e.target;
        if (name === 'cloudModel') setAsset({ ...asset, provider: '', otherProvider: '', location: value === 'Public Cloud' ? 'Global' : '', [name]: value });
        else if (name === 'provider' && value !== 'Others') setAsset({ ...asset, otherProvider: '', [name]: value });
        else setAsset({ ...asset, [name]: value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (!name || !ipAddress || !type || !cloudModel || !assetDepartment) { alert('Please fill in all required fields.'); return; }
        const finalProvider = provider === 'Others' ? otherProvider : provider;
        addAsset({ name, ipAddress, type, cloudModel, provider: finalProvider, location, assetDepartment, username, password, notes, status: 'Active' });
        onClose();
        setAsset({ name: '', ipAddress: '', type: 'VM (Virtual Machine)', cloudModel: 'Private Cloud', provider: '', otherProvider: '', location: '', username: '', password: '', notes: '', assetDepartment: 'Cloud' });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-700">Add New Asset</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Asset Name</label><input type="text" name="name" value={name} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3" required /></div>
                    <div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">IP Address</label><input type="text" name="ipAddress" value={ipAddress} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-slate-700 text-sm font-bold mb-2">Asset Type</label><select name="type" value={type} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3"><option>VM (Virtual Machine)</option><option>Virtual Server</option><option>Physical Server</option><option>Database</option><option>Load Balancer</option><option>Kubernetes Cluster</option><option>Other</option></select></div>
                        <div><label className="block text-slate-700 text-sm font-bold mb-2">Department</label><select name="assetDepartment" value={assetDepartment} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3"><option>Cloud</option><option>Network</option><option>VOIP</option></select></div>
                    </div>
                    <div className="mt-4 mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Cloud Model</label><select name="cloudModel" value={cloudModel} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3"><option value="Private Cloud">Private Cloud</option><option value="Public Cloud">Public Cloud</option></select></div>
                    {cloudModel === 'Private Cloud' && (<div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Location</label><input type="text" name="location" value={location} onChange={onChange} placeholder="e.g., Main Datacenter" className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>)}
                    {cloudModel === 'Public Cloud' && (<>
                            <div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Provider</label><select name="provider" value={provider} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3"><option value="">-- Select --</option><option>AWS</option><option>Azure</option><option>GCP</option><option>Contabo</option><option>Others</option></select></div>
                            {provider === 'Others' && (<div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Specify Other Provider</label><input type="text" name="otherProvider" value={otherProvider} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3" required /></div>)}
                            <div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2">Location</label><input type="text" value="Global" className="shadow-sm bg-slate-100 border rounded w-full py-2 px-3" readOnly /></div>
                        </>)}
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-slate-700 text-sm font-bold mb-2">Username <span className="text-slate-500 text-xs">(Optional)</span></label><input type="text" name="username" value={username} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                        <div><label className="block text-slate-700 text-sm font-bold mb-2">Password <span className="text-slate-500 text-xs">(Optional)</span></label><input type="password" name="password" value={password} onChange={onChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3" /></div>
                    </div>
                    <div className="mt-4"><label className="block text-slate-700 text-sm font-bold mb-2">Notes</label><textarea name="notes" value={notes} onChange={onChange} rows="3" className="shadow-sm appearance-none border rounded w-full py-2 px-3"></textarea></div>
                    <div className="flex justify-end gap-4 mt-8"><button type="button" onClick={onClose} className="px-5 py-2 bg-slate-500 text-white text-sm rounded-md hover:bg-slate-600">Cancel</button><button type="submit" className="px-5 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">Add Asset</button></div>
                </form>
            </div>
        </div>
    );
};
export default AddAssetModal;