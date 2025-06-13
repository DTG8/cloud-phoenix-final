const assetReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ASSETS_SUCCESS':
            return { ...state, assets: action.payload, loading: false };
        case 'ADD_ASSET_SUCCESS':
            return { ...state, assets: [action.payload, ...state.assets] };
        case 'UPDATE_ASSET_SUCCESS':
            return { ...state, assets: state.assets.map(asset => asset._id === action.payload._id ? action.payload : asset) };
        case 'DELETE_ASSET_SUCCESS':
            return { ...state, assets: state.assets.filter(asset => asset._id !== action.payload) };
        case 'ASSET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: true };
        default:
            return state;
    }
};
export default assetReducer;