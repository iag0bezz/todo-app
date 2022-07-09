import Joi from 'joi';

export const CreateTodoValidator = Joi.object({
  body: {
    content: Joi.string().required().messages({
      'any.required': 'todo.content-must-be-provided',
    }),
    completed: Joi.boolean().default(false),
  },
  params: {},
  query: {},
});