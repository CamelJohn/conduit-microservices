import Joi from "joi";

export const authorizationHeaderSchemaValidation = Joi.object()
  .keys({
    authorization: Joi.string()
      .regex(/Bearer \w{0,}/)
      .required(),
  })
  .options({ allowUnknown: true });
