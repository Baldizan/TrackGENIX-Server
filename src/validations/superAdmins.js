import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().pattern(new RegExp(pattern)).required(),
    password: Joi.string().alphanum().min(8).required(),
  });
  const validation = superAdminValidation.validateAsync(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
