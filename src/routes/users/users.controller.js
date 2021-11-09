import { v4 as uuidv4 } from 'uuid';
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from '../../models/user.model.js';

export async function httpGetAllUsers(req, res) {
    return res.status(200).json(await getAllUsers())
}

export async function httpGetUsersSuggest(req, res) {
    const substr = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = await getAllUsers()
    const arrOfUsers = users.sort((user1, user2) => user1.login.localeCompare(user2.login)).filter((userObj) => userObj.login.includes(substr)).slice(0, limit)

    res.send({ suggested: arrOfUsers })
}

export async function httpGetUserById(req, res) {
    const user = await getUserById(req.params.id)
    if (user.length === 0) {
        res.sendStatus(404);
    }
    res.status(200).json(user)
}

export async function httpAddUser(req, res) {
    const id = uuidv4()
    const newUser = {
        ...req.body,
        id,
        isDeleted: false
    }
    const resp = await addUser(newUser)
    console.log(resp);
    res.status(200).send(newUser)
}

export async function httpUpdateUser(req, res) {
    const { id } = req.params
    const userUpdates = req.body

    const updateRes = await updateUser(userUpdates, id)
    res.status(200).json(updateRes)
}

export async function httpDeleteUser(req, res) {
    const { id } = req.params
    const updateRes = await deleteUser(id)
    res.status(200).send(updateRes)
}

