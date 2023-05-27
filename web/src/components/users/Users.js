import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {deleteUser, editUser, fetchUsers, createUser} from '../../store/actions';
import User from "../user/User";
import {selectUsers} from "../../store/selectors";
import Button from '@mui/material/Button';
import './Users.css';

const Users = ({users, fetchUsers, deleteUser, editUser, createUser}) => {

    const [form, setForm] = useState({
        name: '',
        surname: '',
        description: '',
        avatar: null,
    });

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDeleteUser = (id) => {
        deleteUser(id);
    };

    const handleEditUser = (user,) => {
        editUser(user)
    };

    const usersRender = users.map((user) => (
        <User
            key={user._id}
            user={user}
            deleteUserById={handleDeleteUser}
            editUser={handleEditUser}
        />
    ));

    const handleFileChange = (event) => {
        setForm({
            ...form,
            avatar: event.target.files[0]
        })
    }

    const handleChangeForm = (event) => {
        if (event.target.name === 'avatar') {
            setForm({
                ...form,
                [event.target.name]: event.target.files[0],
            });
        } else {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
            });
        }
    };

    const createUserFormButton = (event) => {
        console.log('check')
        event.preventDefault();

        const nonUndefinedFields = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value !== undefined && value !== '' && value !== null)
        );

        createUser(nonUndefinedFields)
    };

    return (
        <div className={'container'}>
            <div className={'item-center'}>
                <form onSubmit={(e) => createUserFormButton(e)}>
                    <input type="text" name='name' value={form.name} onChange={handleChangeForm}/>
                    <input type="text" name='surname' value={form.surname} onChange={handleChangeForm}/>
                    <input type="text" name='description' value={form.description} onChange={handleChangeForm}/>
                    <input type="file" name='avatar' onChange={handleFileChange}/>
                    <Button variant="outlined" type={'submit'}>Create user</Button>
                </form>
            </div>
            <div className={'cards-container'}>
                {usersRender}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: selectUsers(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        deleteUser: (id) => dispatch(deleteUser(id)),
        editUser: (user) => dispatch(editUser(user)),
        createUser: (user) => dispatch(createUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
