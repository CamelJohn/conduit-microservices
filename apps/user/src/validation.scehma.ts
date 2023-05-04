import Joi from "joi";

export const createBodyValidationSchema = Joi.object({
  user: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }).required(),
});

export const loginBodyValidationSchema = Joi.object({
  user: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }).required(),
});
