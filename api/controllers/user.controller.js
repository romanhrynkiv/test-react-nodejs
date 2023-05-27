const User = require("../models/user");
const {getAllUsers, getUserById, getOneUser, getUserByIdAndDelete} = require("../dao/user.dao");
const multer = require("multer");

const createUser = async (req, res) => {
    try {
        const { name, surname, description } = req.body;
        const requiredFields = ['name', 'surname', 'description'];

        console.log(req.body);
        const avatar = req.file.filename;
        console.log(req.file);

        if (name && surname && description) {

            await getOneUser(name, surname)
                .then(async (result) => {
                    if (!result) {
                        const user = new User({ name, surname, description, avatar });
                        const savedUser = await user.save();
                        return res.status(201).json({data: savedUser});
                    } else {
                        return res.status(409).json({message: 'User with such name and surname already used'});
                    }
                })
                .catch( err => {
                    console.error(err);
                });

        } else {
            const missingFields = requiredFields.filter(field => !req.body[field]);
            return res.status(400).json({ message: `Required fields are missing: ${missingFields.join(', ')}` })
        }
    } catch (error) {
        console.error(error);
        return res.status(501).json({ error: 'Sorry, unexpected error' });
    }
}

const getUsers = async (req, res) => {
    try {
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = 5;
        const users = await getAllUsers(offset, limit);
        res.status(200).json({data: users});
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Sorry, unexpected error' });
    }
}

const editUser = async (req, res) => {
    console.log('start')
    try {
        const { id } = req.params;
        const { name, surname, description } = req.body;
        const avatar = req.file;
        console.log('_______1_______')
        console.log({ name, surname, description });
        console.log('_______2_______')
        console.log(req.file);
        console.log('_______3_______')
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User is not founded' });
        }

        const pathAvatar = avatar ? avatar.filename : await getUserById(id).then(data => {
            return data.avatar;
        })

        await getOneUser(name, surname)
            .then(async (result) => {
                if (!result) {
                    user.name = name;
                    user.surname = surname;
                    user.description = description;
                    user.avatar = pathAvatar;

                    const updatedUser = await user.save();

                    return res.status(200).json({data: updatedUser});
                } else {
                    return res.status(409).json({message: 'User with such name and surname already used'});
                }
            })
            .catch( err => {
                console.error(err);
                res.status(501).json({ error: 'Sorry, unexpected error' });
            });

    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Sorry, unexpected error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await getUserByIdAndDelete(id)
            .then(() => res.status(200).json({message: 'User has deleted'}))
            .catch(() => res.status(404).json({ error: 'User is not founded' }));
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Sorry, unexpected error' });
    }
}

module.exports = [
    createUser,
    getUsers,
    editUser,
    deleteUser
]
