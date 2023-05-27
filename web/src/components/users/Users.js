import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {deleteUser, editUser, fetchUsers, createUser} from '../../store/actions';
import User from "../user/User";
import {selectUsers} from "../../store/selectors";
import Button from '@mui/material/Button';
import './Users.css';
import FormControl from '@mui/base/FormControl';
import {Input, InputLabel} from "@mui/material";

const Users = ({users, fetchUsers, deleteUser, editUser, createUser}) => {

    const [form, setForm] = useState({
        name: '',
        surname: '',
        description: '',
        avatar: null,
    });
    const [offset, setOffset] = useState(0);
    const [countUsers, setCountUsers] = useState(0);

    const limit = 5;

    const initialForm = {
        name: '',
        surname: '',
        description: '',
        avatar: null,
    }

    useEffect(() => {
        fetchUsers({offset, limit});
    }, [fetchUsers, offset, limit]);

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data => {
                setCountUsers(data.data.totalUsers)
            })
    })

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

        const {name, value, files} = event.target;

        if (name === 'avatar') {
            setForm({
                ...form,
                [name]: files[0],
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }

    };

    const createUserFormButton = (event) => {
        event.preventDefault();

        if (form.name.length >= 3 && form.surname.length >= 3 && form.description.length >= 3 && form.avatar) {
            const nonUndefinedFields = Object.fromEntries(
                Object.entries(form).filter(([key, value]) => value !== undefined && value !== '' && value !== null)
            );
            createUser(nonUndefinedFields);
            setForm({...initialForm})
        }
    };

    const getAccessToButton = () => {
        return !(form.name.length >= 1
            && form.surname.length >= 1
            && form.description.length >= 1
            && form.avatar !== null
            && form.avatar !== undefined
        )
    }

    const handleLoadNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handleLoadPrev = () => {
        setOffset((prevOffset) => prevOffset - limit);
    };

    return (
        <div className={'container'}>
            <div className={'item-center'}>
                <form className={'form-create-user'} onSubmit={(e) => createUserFormButton(e)}>
                    <FormControl className={'form-create-user_input'}>
                        <InputLabel>Name <span hidden={form.name.length >= 1}>*require</span></InputLabel>
                        <Input value={form.name} onChange={handleChangeForm} type="text" name='name'/>
                    </FormControl>
                    <FormControl className={'form-create-user_input'}>
                        <InputLabel>Surname <span hidden={form.surname.length >= 1}>*require</span></InputLabel>
                        <Input value={form.surname} onChange={handleChangeForm} type="text" name='surname'/>
                    </FormControl>
                    <FormControl className={'form-create-user_input'}>
                        <InputLabel>Description <span hidden={form.description.length >= 1}>*require</span></InputLabel>
                        <Input value={form.description} onChange={handleChangeForm} type="text" name='description'/>
                    </FormControl>
                    <FormControl className={'form-create-user_input'}>
                        <input onChange={handleFileChange} type="file" name='avatar'/>
                    </FormControl>
                    <Button variant="outlined"
                            type={'submit'}
                            disabled={getAccessToButton()}
                    >Create user</Button>
                </form>
            </div>
            <div className={'cards-container'}>
                {usersRender}
            </div>
            <div className={'paginationButtonBlock'}>
                {
                    offset >= 5
                        ? (<Button className={'paginationButton'}
                                   variant="outlined"
                                   onClick={handleLoadPrev}>Prev Page</Button>)
                        : null
                }
                {
                    countUsers - offset > 5
                        ? (<Button className={'paginationButton'} variant="outlined" onClick={handleLoadNext}>Next
                            Page</Button>)
                        : null
                }

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
        fetchUsers: (offset, limit) => dispatch(fetchUsers(offset, limit)),
        deleteUser: (id) => dispatch(deleteUser(id)),
        editUser: (user) => dispatch(editUser(user)),
        createUser: (user) => dispatch(createUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
