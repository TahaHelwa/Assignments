// Middleware function for validating requests
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  };
};

export default validateRequest;
