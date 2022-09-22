import Joi from 'joi';

export const RevalidateTokenValidator = Joi.object({
  body: {
    token: Joi.string().required().messages({
      'any.required': 'authentication.token-must-be-provided',
      'body.username': 'authentication.token-must-be-provided',
    }),
  },
  params: {},
  query: {},
});
