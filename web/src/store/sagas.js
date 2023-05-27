import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    fetchUsersSuccess,
    deleteUserSuccess, editUserSuccess, EDIT_USER, createUserSuccess, CREATE_USER,
} from './actions';
import {fetchApi} from "../requests/fetchApi";

function* fetchUsersSaga(action) {
    try {
        const { offset, limit } = action.payload;
        const data = yield call(fetchApi, '/users', 'GET', null, { offset, limit });
        yield put(fetchUsersSuccess(data.data.users));
    } catch (error) {
        console.log(error);
    }
}

function* deleteUserSaga(action) {
    const { payload: id } = action;
    try {
        yield call(fetchApi, `/user/${id}`, 'DELETE');
        yield put(deleteUserSuccess(id));
    } catch (error) {
        console.log(error);
    }
}

function* updateUserSaga(action) {
    const { payload: user } = action;
    try {
        const response = yield call(fetchApi, `/user/${user._id}`, 'PUT', user);
        yield put(editUserSuccess(response))
    } catch (error) {
        console.log(error);
    }
}

function* createUserSaga(action) {
    const { payload: user } = action;
    try {
        const response = yield call(fetchApi, '/users', 'POST', user);
        yield put(createUserSuccess(response));
    } catch (error) {
        console.log(error);
    }
}

function* watchUsers() {
    yield takeEvery(FETCH_USERS, fetchUsersSaga);
    yield takeEvery(DELETE_USER, deleteUserSaga);
    yield takeEvery(EDIT_USER, updateUserSaga);
    yield takeEvery(CREATE_USER, createUserSaga);
}

export default function* rootSaga() {
    yield all([watchUsers()]);
}
