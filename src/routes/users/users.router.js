import { Router } from 'express'
import { httpGetAllUsers, httpGetUserById, httpGetUsersSuggest, httpAddUser, httpUpdateUser, httpDeleteUser } from './users.controller.js';
import { suggestQuerySchema, idParamsSchema, createUserSchema, validator } from '../../models/users.validation.js';

const usersRouter = Router()

usersRouter.get('/', httpGetAllUsers)

usersRouter.get('/suggest', validator.query(suggestQuerySchema), httpGetUsersSuggest)

usersRouter.get('/:id', validator.params(idParamsSchema), httpGetUserById)

usersRouter.post('/', validator.body(createUserSchema), httpAddUser)

usersRouter.put('/:id', validator.params(idParamsSchema), httpUpdateUser)

usersRouter.delete('/:id', validator.params(idParamsSchema), httpDeleteUser)

export default usersRouter
