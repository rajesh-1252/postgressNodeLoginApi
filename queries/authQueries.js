const registerQuery =
  "INSERT INTO employee_master(employee_code , full_name, designation ,email,  mobile_number , login_password, date_of_birth , date_of_joining, available_status) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9) RETURNING user_id, employee_code, full_name, designation, email, mobile_number, date_of_birth, date_of_joining, available_status";

const updateEmployeeQuery =
  "UPDATE employee_master SET employee_code =$2 , full_name =$3, designation =$4 ,email = $5,  mobile_number = $6 ,  date_of_birth = $7 , date_of_joining = $8, available_status = $9 WHERE user_id = $1 returning user_id, employee_code, full_name, designation, email, mobile_number, date_of_birth, date_of_joining, available_status ";

const getAllEmployeeQuery =
  "SELECT user_id, employee_code, full_name, designation, email, mobile_number, date_of_birth, date_of_joining, available_status FROM employee_master ";

export { registerQuery, updateEmployeeQuery, getAllEmployeeQuery };
