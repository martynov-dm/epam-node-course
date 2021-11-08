import express from 'express'
import usersRouter from './routes/users/users.router.js';
import { headerSchema, validator } from './models/users.validation.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(validator.headers(headerSchema))

app.use('/users', usersRouter)

export default app
