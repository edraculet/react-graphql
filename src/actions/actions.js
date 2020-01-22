// App actions

export const loadUsers = usersList => ({
    type: 'LOAD_USERS',
    usersList
});

export const addNewUser = user => ({
    type: 'ADD_NEW_USER',
    user
});

export const removeUser = userId => ({
    type: 'REMOVE_USER',
    userId
});
export const setMessage = message => ({
    type: 'SET_MESSAGE',
    message
});
