import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidations = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters')
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters')
      .required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters').required(),
    project: Joi.string().length(24),
    active: Joi.boolean(),
  });

  const validation = employeesValidations.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const employeesValidations = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters'),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters'),
    phone: Joi.number().min(10),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters'),
    project: Joi.string().length(24),
    active: Joi.boolean(),
  });

  const validation = employeesValidations.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export { validateUpdate, validateCreation };
