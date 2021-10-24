import { Router } from 'express'
import { usersDB } from './db.js';
import { createUserSchema, idParamsSchema, suggestQuerySchema, validator } from './validation.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.get('/', (req, res) => {
    res.send(usersDB)
})

router.get('/suggest', validator.query(suggestQuerySchema), (req, res) => {
    const substr = req.query.loginSubstring;
    const limit = req.query.limit;

    const arrOfUsers = Object.values(usersDB).sort((user1, user2) => user1.login.localeCompare(user2.login)).filter((userObj) => userObj.login.includes(substr)).slice(0, limit)

    res.send({ suggested: arrOfUsers })
})

router.get('/:id', validator.params(idParamsSchema), (req, res) => {
    const user = usersDB[req.params.id]
    if (!user) {
        res.sendStatus(404);
    }
    res.send(user)
})


router.post('/', validator.body(createUserSchema), (req, res) => {
    const id = uuidv4()
    const newUser = {
        ...req.body,
        id,
        isDeleted: false
    }
    usersDB[id] = newUser
    res.status(200).send(newUser)
})

router.put('/:id', validator.params(idParamsSchema), (req, res) => {
    const { id } = req.params
    const userFromDB = usersDB[id]
    if (!userFromDB) res.status(404).send('User not found')
    const updatedUser = {
        ...userFromDB,
        ...req.body
    }
    usersDB[id] = updatedUser
    res.status(200).send(updatedUser)
})

router.delete('/:id', validator.params(idParamsSchema), (req, res) => {
    const { id } = req.params
    const userFromDB = usersDB[id]
    if (!userFromDB) res.status(404).send('User not found')
    const updatedUser = {
        ...userFromDB,
        isDeleted: true
    }
    usersDB[id] = updatedUser
    res.status(200).send(updatedUser)
})

export default router
