import Joi from 'joi';

const validateEdit = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8),
  });

  const validation = superAdminValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateEdit;
