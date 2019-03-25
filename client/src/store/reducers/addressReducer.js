const initialState = {
    address: {}
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAddresses': {
            return {
                address: action.payload
            };
        }
        default:
            return state;
    }
};

export default addressReducer;
