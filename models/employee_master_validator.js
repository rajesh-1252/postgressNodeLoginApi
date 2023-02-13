import Joi from "joi";
const validator = (schema) => {
  return (payload) => {
    return schema.validate(payload, { abortEarly: false });
  };
};

const registerSchema = Joi.object({
  email: Joi.string().email().message({
    "string.email": "Please provide a valid email",
  }),

  employee_code: Joi.string().required(),

  full_name: Joi.string().min(3).max(30).message({
    "string.min": "Name should be more than 3 character",
    "string.max": "Name should be less than 30 character",
  }),

  designation: Joi.string().min(3).max(30).message({
    "string.min": "Designation should be more than 3 character",
    "string.max": "Designation should be less than 30 character",
  }),

  mobile_number: Joi.number().min(10).message({
    "number.min": "Mobile number should be 10 digits",
  }),

  login_password: Joi.string().min(3).max(20).message({
    "string.min": "Password should be more than 3 character",
    "string.max": "Password should be less than 20 character",
  }),

  date_of_birth: Joi.date().required(),

  date_of_joining: Joi.date().required(),

  available_status: Joi.string().required(),
});

const validateRegister = validator(registerSchema);
export default validateRegister;
