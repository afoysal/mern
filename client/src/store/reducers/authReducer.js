const initialState = {
    result: {},
    value: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'registration': {
            return {
                result: action.payload,
                value: action.value
            };
        }
        case 'login': {
            return {
                result: action.payload,
                value: action.value
            };
        }
        case 'logout': {
            return initialState;
        }
        default:
            return state;
    }
}

export default authReducer;
