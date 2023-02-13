import { StatusCodes } from "http-status-codes";
import query from "../db/connectDB.js";
import {
  BadRequestError,
  UnAuthenticatedError,
  ValidationError,
} from "../errors/index.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import validateRegister from "../models/employee_master_validator.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import {
  getAllEmployeeQuery,
  registerQuery,
  updateEmployeeQuery,
} from "../queries/authQueries.js";
// add employee

const register = async (req, res) => {
  const { error, values } = validateRegister(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }
  const {
    employee_code,
    full_name,
    designation,
    email,
    mobile_number,
    login_password,
    date_of_birth,
    date_of_joining,
    available_status,
  } = req.body;
  const employee = await query(
    "SELECT * FROM employee_master WHERE email = $1",
    [email]
  );
  if (employee.rows.length > 0) {
    throw new BadRequestError("Employee Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(login_password, salt);
  const newEmployee = await query(registerQuery, [
    employee_code,
    full_name,
    designation,
    email,
    mobile_number,
    bcryptPassword,
    date_of_birth,
    date_of_joining,
    available_status,
  ]);

  const tokenUser = { email, designation };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ result: newEmployee.rows[0] });
};

// ------------------------------------------------------------//

const login = async (req, res) => {
  const { email, login_password } = req.body;
  const user = await query("SELECT * FROM employee_master WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    throw new BadRequestError("Employee not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    login_password,
    user.rows[0].login_password
  );

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const { designation, employee_code } = user.rows[0];
  const tokenUser = { employee_code, email, designation };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ result: tokenUser });
};

// ------------------------------------------------------------//

const updateEmployee = async (req, res) => {
  const { id: empId } = req.params;

  const user = await query(
    "SELECT * FROM employee_master WHERE user_id = $1 ",
    [empId]
  );
  if (user.rows.length == 0) {
    throw new BadRequestError("No user with the given Id");
  }
  const { error, values } = validateRegister(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }
  const cols = Object.values(req.body);
  console.log(cols);
  const updateUser = await query(updateEmployeeQuery, [empId, ...cols]);
  res.status(StatusCodes.OK).json({ result: updateUser.rows[0] });
};

// ------------------------------------------------------------//

const getAllEmployee = async (req, res) => {
  let { availableStatus } = req.query;

  let queryStr = getAllEmployeeQuery;

  const page = Number(req.query.page) || 1;
  const limit = 2;
  const skip = (page - 1) * limit;
  let employee;
  let empCount;
  if (availableStatus) {
    queryStr += " WHERE available_status = $1 LIMIT $2 OFFSET $3";
    employee = await query(queryStr, [availableStatus, limit, skip]);
    empCount = await query(
      "SELECT COUNT(*) FROM employee_master where available_status = $1",
      [availableStatus]
    );
  } else {
    queryStr += " LIMIT $1 OFFSET $2";
    employee = await query(queryStr, [limit, skip]);
    empCount = await query("SELECT COUNT(*) FROM employee_master");
  }
  console.log(empCount);

  const totalEmployee = empCount.rows[0].count;
  console.log(totalEmployee);
  const totalPage = Math.ceil(totalEmployee / limit);

  res.status(StatusCodes.OK).json({
    result: employee.rows,
    totalEmployees: totalEmployee,
    totalPage: totalPage,
  });
};
export { register, login, updateEmployee, getAllEmployee };
