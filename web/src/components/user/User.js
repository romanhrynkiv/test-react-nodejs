import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './User.css';
import {Card, CardActions, CardContent, CardMedia, Input, InputLabel, Typography} from "@mui/material";
import FormControl from "@mui/base/FormControl";

const User = ({user, deleteUserById, editUser}) => {

    const {_id, name, surname, description, avatar} = user;

    const pathUploads = 'http://localhost:8080/api/uploads/';

    const [editPanel, setEditPanel] = useState(false);
    const [form, setForm] = useState({
        name: '',
        surname: '',
        description: '',
        avatar: '',
    })

    const editUserByFields = (event) => {
        event.preventDefault();

        const nonUndefinedFields = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value !== undefined && value !== '' && value !== null)
        );

        const updatedUser = {
            ...user,
            ...nonUndefinedFields
        }

        editUser(updatedUser);
    }

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

    const getAccessToButton = () => {
        return !(form.name.length >= 1
            && form.surname.length >= 1
            && form.description.length >= 1
            && form.avatar !== null
            && form.avatar !== undefined
        )
    }

    return (
        <>
            <Card className={'card-shadow'} sx={{maxWidth: 345, margin: '0 auto', background: '#e7e7e7'}}>
                <CardMedia
                    sx={{height: 140}}
                    image={`${pathUploads}${avatar}`}
                    title={`${name}'s avatar`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${name} ${surname}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
                <CardActions className={'display-buttons-user'}>
                    <Button onClick={() => deleteUserById(_id)}
                            color={'error'}
                            variant="outlined"
                            startIcon={<DeleteIcon/>}>DELETE USER</Button>
                    <Button onClick={() => setEditPanel(prevState => !prevState)}
                            variant="outlined">{editPanel ? 'CLOSE' : 'EDIT'}</Button>
                </CardActions>
                {
                    editPanel
                        ? (<div>
                            <form onSubmit={(e) => editUserByFields(e)}>
                                <FormControl className={'form-create-user_input'}>
                                    <InputLabel>Name <span hidden={form.name.length >= 1}>*require</span></InputLabel>
                                    <Input type="text" name='name' value={form.name} onChange={handleChangeForm}/>
                                </FormControl>
                                <FormControl className={'form-create-user_input'}>
                                    <InputLabel>Surname <span hidden={form.surname.length >= 1}>
                                        *require
                                    </span></InputLabel>
                                    <Input type="text" name='surname' value={form.surname} onChange={handleChangeForm}/>
                                </FormControl>
                                <FormControl className={'form-create-user_input'}>
                                    <InputLabel>Description <span
                                        hidden={form.description.length >= 1}>*require</span></InputLabel>
                                    <Input type="text" name='description' value={form.description}
                                           onChange={handleChangeForm}/>
                                </FormControl>
                                <FormControl className={'form-create-user_input'}>
                                    <InputLabel>File</InputLabel>
                                    <Input type="file" name='avatar' onChange={handleFileChange}/>
                                </FormControl>

                                <Button className={'update-user-button'}
                                        variant="outlined" type={"submit"}
                                        disabled={getAccessToButton()}>Update</Button>
                            </form>
                        </div>)
                        : null
                }
            </Card>
        </>
    );
};

export default User;
