import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timeSheetsValidations = Joi.object({
    description: Joi.string().min(5).max(100).required(),
    date: Joi.date().required(),
  });

  const validation = timeSheetsValidations.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.datails[0].message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
