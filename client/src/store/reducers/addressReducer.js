const initialState = {
    address: {}
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAddresses': {
            return {
                ...state,
                address: action.payload
            };
        }
        case 'addAddress': {
            return {
                ...state,
                addaddress: action.payload
            };
        }
        case 'erroraddAddress': {
            return {
                ...state,
                erroraddAddress: action.payload
            };
        }
        case 'uploadImage': {
            return {
                ...state,
                uploadImage: action.payload
            };
        }
        case 'uploadImageerror': {
            return {
                ...state,
                uploadImageerror: action.payload
            };
        }
        case 'openModal': {
            return {
                ...state,
                controlModal: action.payload
            };
        }
        case 'deleteImage': {
            return {
                ...state,
                deleteImage: action.payload
            };
        }
        default:
            return state;
    }
};

export default addressReducer;