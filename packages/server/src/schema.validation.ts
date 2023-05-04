import Joi from "joi";

export const serverConfigSchemaValidation = Joi.object({
  port: Joi.number().required(),
  prefix: Joi.string().required(),
  message: Joi.string().required(),
}).required();

export const authorizationHeaderSchemaValidation = Joi.object()
  .keys({
    authorization: Joi.string()
      .regex(/Bearer \w{0,}/)
      .required(),
  })
  .options({ allowUnknown: true });
