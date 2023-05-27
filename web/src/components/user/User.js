import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './User.css';
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

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

    return (
        <>
            <Card className={'card-shadow'} sx={{ maxWidth: 345, margin: '0 auto', background: '#e7e7e7'}}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={`${pathUploads}${avatar}`}
                    title={`${name}'s avatar`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${name} ${surname}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => deleteUserById(_id)}
                            color={'error'}
                            variant="outlined"
                            startIcon={<DeleteIcon/>}>DELETE USER</Button>
                    <Button onClick={() => setEditPanel(prevState => !prevState)}
                            variant="outlined">EDIT</Button>
                </CardActions>
            </Card>
            {
                editPanel
                    ? (<div>
                        <form onSubmit={(e) => editUserByFields(e)}>
                            <input type="text" name='name' value={form.name} onChange={handleChangeForm}/>
                            <input type="text" name='surname' value={form.surname} onChange={handleChangeForm}/>
                            <input type="text" name='description' value={form.description} onChange={handleChangeForm}/>
                            <input type="file" name='avatar' onChange={handleFileChange}/>
                            <Button type={"submit"}>Update</Button>
                        </form>
                    </div>)
                    : null
            }

        </>
    );
};

export default User;
