import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    rate: Joi.number().min(1).max(1000).required(),
  });

  const projectsValidations = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(5).max(50).required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    clientName: Joi.string().min(3).max(20).required(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectsValidations.validate(req.body);
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
