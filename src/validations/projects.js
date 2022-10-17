import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const employeeValidation = Joi.object({
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM'),
    rate: Joi.number(),
  });

  const projectsValidations = Joi.object({
    name: Joi.string().min(3).max(20),
    description: Joi.string().min(5).max(50),
    startDate: Joi.date(),
    endDate: Joi.date(),
    clientName: Joi.string().min(3).max(20),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectsValidations.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Ups! There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateUpdate,
};
