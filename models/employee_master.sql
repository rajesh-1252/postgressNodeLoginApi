CREATE TABLE employee_master (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    employee_code VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile_number BIGINT NOT NULL,
    login_password VARCHAR(255),
    date_of_birth DATE NOT NULL,
    date_of_joining DATE NOT NULL,
    available_status VARCHAR(50)
);

CREATE TABLE employee_status (
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    user_id BIGINT NOT NULL REFERENCES employee_master(user_id), 
    available_status VARCHAR(50)
);