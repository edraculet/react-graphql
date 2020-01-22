const initialState = {
    allUsers: [],
    message : [
        {
            type: '',
            text:''
        }
    ]
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return {
                ...state,
                allUsers: action.usersList,
                loaded: true
            };
        case 'ADD_NEW_USER':
            return {
                ...state,
                allUsers: [action.user,...state.allUsers],
            };
        case 'REMOVE_USER':
            return {
                ...state,
                allUsers: state.allUsers.filter((item) => item.id !== action.userId)
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.message,
            };

        default:
            return state
    }
};

export default users