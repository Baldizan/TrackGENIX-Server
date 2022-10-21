import Joi from 'joi';

const validateAdmin = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
  });

  const validation = adminValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateAdmin;
