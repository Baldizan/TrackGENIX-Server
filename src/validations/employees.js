import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidations = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validation = employeesValidations.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next;
};

export default {
  validateCreation,
};
