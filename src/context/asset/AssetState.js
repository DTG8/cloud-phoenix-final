import React, { useReducer, useCallback } from 'react';
import axios from 'axios';
import AssetContext from './assetContext';
import assetReducer from './assetReducer';

export const AssetProvider = ({ children }) => {
    const initialState = { assets: [], loading: true, error: null };
    const [state, dispatch] = useReducer(assetReducer, initialState);
    const API_URL = 'https://project-phoenix-api.onrender.com/api';

    const getAssets = useCallback(async () => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await axios.get(`${API_URL}/assets`);
            dispatch({ type: 'GET_ASSETS_SUCCESS', payload: res.data });
        } catch (err) { dispatch({ type: 'ASSET_ERROR', payload: 'Could not fetch assets' }); }
    }, []);

    const addAsset = useCallback(async asset => {
        try {
            const res = await axios.post(`${API_URL}/assets`, asset, { headers: { 'Content-Type': 'application/json' } });
            dispatch({ type: 'ADD_ASSET_SUCCESS', payload: res.data });
        } catch (err) { dispatch({ type: 'ASSET_ERROR', payload: 'Could not add asset' }); }
    }, []);
    
    const updateAsset = useCallback(async asset => {
        try {
            const res = await axios.put(`${API_URL}/assets/${asset._id}`, asset, { headers: { 'Content-Type': 'application/json' } });
            dispatch({ type: 'UPDATE_ASSET_SUCCESS', payload: res.data });
        } catch (err) { dispatch({ type: 'ASSET_ERROR', payload: 'Could not update asset' }); }
    }, []);

    const deleteAsset = useCallback(async id => {
        try {
            await axios.delete(`${API_URL}/assets/${id}`);
            dispatch({ type: 'DELETE_ASSET_SUCCESS', payload: id });
        } catch (err) { dispatch({ type: 'ASSET_ERROR', payload: 'Could not delete asset' }); }
    }, []);

    return (
        <AssetContext.Provider value={{...state, getAssets, addAsset, updateAsset, deleteAsset}}>
            {children}
        </AssetContext.Provider>
    );
};

