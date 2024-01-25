const UserModel = require('../models/User');
const { hashSync, compare } = require('bcryptjs');
const logger = require('../logger/logger');
const saltlength = 10; //default

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        logger.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({ error: `User with ${email} not found` });
        }
        res.json(user);
    } catch (error) {
        logger.error(`Error fetching user by email ${email}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    const user = req.body;

    // Set the name property based on the presence of firstName and lastName
    user.name = (user.first && user.last) ? { first: user.first, last: user.last } :
        (user.first) ? { first: user.first, last: '' } :
            (user.last) ? { first: '', last: user.last } :
                '';

    user.password = hashSync(user.password, saltlength);

    try {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    user.name = (user.first && user.last) ? { first: user.first, last: user.last } :
        (user.first) ? { first: user.first, last: '' } :
            (user.last) ? { first: '', last: user.last } :
                '';

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            user,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        logger.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(`Succesfuly deleted the user with ID: ${id}`);
    } catch (error) {
        logger.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById,
};
