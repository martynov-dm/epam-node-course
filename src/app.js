import express from 'express'
import { headerSchema, validator } from './models/user.validation.js';
import usersRouter from './routes/users/users.router.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(validator.headers(headerSchema))

app.use('/users', usersRouter)

export default app
