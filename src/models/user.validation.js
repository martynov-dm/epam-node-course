import Joi from 'joi';
import * as expressValidation from 'express-joi-validation';

export const validator = expressValidation.createValidator({})

export const headerSchema = Joi.object({
    host: Joi.string().required(),
    'user-agent': Joi.string().required()
})

export const createUserSchema = Joi.object({
    login: Joi.string().alphanum(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/),
    age: Joi.number().min(4).max(130)
}).options({ presence: 'required' })

export const idParamsSchema = Joi.object({
    id: Joi.string().required()
})

export const suggestQuerySchema = Joi.object({
    loginSubstring: Joi.string().alphanum(),
    limit: Joi.number()
}).options({ presence: 'required' })
