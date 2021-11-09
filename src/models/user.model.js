import Sequelize from 'sequelize';
import { db } from '../services/sequelize.js';

export const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
})

User.sync().then(() => {
    console.log('table created');
});

export async function getAllUsers() {
    return await User.findAll();
}

export async function addUser(newUser) {
    return await User.create(newUser);
}

export async function getUserById(id) {
    return await User.findAll({
        where: {
            id
        }
    })
}

export async function updateUser(newUserData, id) {
    return (await User.update(newUserData, {
        where: {
            id
        },
        returning: true,
        plain: true
    }))[1]
}

export async function deleteUser(id) {
    return (await User.update({ isDeleted: true }, {
        where: {
            id
        },
        returning: true,
        plain: true
    }))[1]
}
