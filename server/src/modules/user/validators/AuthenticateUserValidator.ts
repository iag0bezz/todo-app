import Joi from 'joi';

export const AuthenticateUserValidator = Joi.object({
  body: {
    username: Joi.string().required().messages({
      'any.required': 'authentication.username-must-be-provided',
      'body.username': 'authentication.username-must-be-provided',
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9-@_#!&=.$]{3,30}$/)
      .required()
      .messages({
        'any.required': 'authentication.password-must-be-provided',
        'body.password': 'authentication.password-must-be-provided',
        'string.pattern.base': 'authentication.password-invalid-pattern',
      }),
  },
  params: {},
  query: {},
});
