const User = require("../models/user");

const getAllUsers = async (offset, limit) => {
    const usersQuery = User.find().skip(offset).limit(limit);
    const totalUsersQuery = User.countDocuments();

    const [users, totalUsers] = await Promise.all([usersQuery, totalUsersQuery]);

    return { users, totalUsers };
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
