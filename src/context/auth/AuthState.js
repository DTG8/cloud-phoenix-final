import React, { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    const API_URL = 'https://project-phoenix-api.onrender.com/api';

    const loadUser = useCallback(async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        } else {
            dispatch({ type: 'AUTH_ERROR' });
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/auth`);
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    }, []);
    
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const register = async formData => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, formData, { headers: { 'Content-Type': 'application/json' } });
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
        }
    };

    const login = async formData => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, formData, { headers: { 'Content-Type': 'application/json' } });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });
    const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

    return (
        <AuthContext.Provider value={{...state, register, login, logout, clearErrors, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};