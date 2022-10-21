import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const tasksValidation = Joi.object({
    description: Joi.string().min(3).max(50).required(),
  });

  const validation = tasksValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
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

export{ validateCreation ,
 validateEdit 
};
