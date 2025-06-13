import setAuthToken from '../../utils/setAuthToken';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return { ...state, isAuthenticated: true, loading: false, user: action.payload };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            setAuthToken(action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true, loading: false };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            setAuthToken(null);
            return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: null };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};
export default authReducer;
