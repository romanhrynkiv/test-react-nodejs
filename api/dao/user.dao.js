const User = require("../models/user");

const getAllUsers = async () => {
    return User.find();
}

const getOneUser = async (name, surname) => {
    return User.findOne({name, surname});
}

const getUserById = async (id) => {
    return User.findById(id);
}

const getUserByIdAndDelete = async (id) => {
    return User.findByIdAndDelete(id);
}

module.exports = {
    getAllUsers,
    getOneUser,
    getUserById,
    getUserByIdAndDelete
}
