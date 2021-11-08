import { getAllUsers }  from '../../models/users.model.js'
import { v4 as uuidv4 } from 'uuid';

export function httpGetAllUsers(req, res) {
    return res.status(200).json(getAllUsers())
}

export function httpGetUsersSuggest(req, res) {
    const substr = req.query.loginSubstring;
    const limit = req.query.limit;

    const arrOfUsers = Object.values(usersDB).sort((user1, user2) => user1.login.localeCompare(user2.login)).filter((userObj) => userObj.login.includes(substr)).slice(0, limit)

    res.send({ suggested: arrOfUsers })
}

export function httpGetUserById(req, res) {
    const user = usersDB[req.params.id]
    if (!user) {
        res.sendStatus(404);
    }
    res.status(200).json(user)
}

export function httpAddUser(req, res) {
    const id = uuidv4()
    const newUser = {
        ...req.body,
        id,
        isDeleted: false
    }
    usersDB[id] = newUser
    res.status(200).send(newUser)
}

export function httpUpdateUser(req, res) {
    const { id } = req.params
    const userFromDB = usersDB[id]
    if (!userFromDB) res.status(404).send('User not found')
    const updatedUser = {
        ...userFromDB,
        ...req.body
    }
    usersDB[id] = updatedUser
    res.status(200).json(updatedUser)
}

export function httpDeleteUser(req, res) {
    const { id } = req.params
    const userFromDB = usersDB[id]
    if (!userFromDB) res.status(404).send('User not found')
    const updatedUser = {
        ...userFromDB,
        isDeleted: true
    }
    usersDB[id] = updatedUser
    res.status(200).send(updatedUser)
}

