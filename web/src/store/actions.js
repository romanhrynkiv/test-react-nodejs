export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

export const fetchUsers = ({offset, limit}) => ({
    type: FETCH_USERS,
    payload: {offset, limit}
});

export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: id,
});

export const deleteUserSuccess = (id) => ({
    type: DELETE_USER_SUCCESS,
    payload: id,
});

export const editUser = (user) => ({
    type: EDIT_USER,
    payload: user,
})

export const editUserSuccess = (user) => ({
    type: EDIT_USER_SUCCESS,
    payload: user,
});

export const createUser = (user) => ({
    type: CREATE_USER,
    payload: user,
});

export const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload: user,
});
