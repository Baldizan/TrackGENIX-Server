import Joi from 'joi';

const validateEdit = (req, res, next) => {
  const tasksEditValidation = Joi.object({
    description: Joi.string().min(3).max(50),
  });

  const validation = tasksEditValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateEdit;
