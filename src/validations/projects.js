import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().required(),
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    rate: Joi.number().min(1).max(1000).required(),
  });

  const projectsValidations = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(5).max(50).required(),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(20).required(),
    active: Joi.boolean(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectsValidations.validate(req.body, { abortEarly: false });
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
  const employeeValidation = Joi.object({
    employee: Joi.string(),
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM'),
    rate: Joi.number(),
  });

  const projectsValidations = Joi.object({
    name: Joi.string().min(3).max(20),
    description: Joi.string().min(5).max(50),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(20),
    active: Joi.boolean(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectsValidations.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEmployee = (req, res, next) => {
  const employeeValidation = Joi.object({
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    rate: Joi.number().required(),
    employee: Joi.string().required(),
  });

  const validation = employeeValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export {
  validateCreation,
  validateUpdate,
  validateEmployee,
};
