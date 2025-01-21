
-- Create Department Table
CREATE TABLE department (
    d_id VARCHAR(4) NOT NULL,
    d_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (d_id),
    UNIQUE KEY (d_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Employee Details Table
CREATE TABLE emp_details (
    e_id CHAR(5) NOT NULL,
    e_name VARCHAR(30) NOT NULL,
    e_mobile_number BIGINT NOT NULL Unique,
    e_gender VARCHAR(6) NOT NULL,
    e_email VARCHAR(60),
    e_address VARCHAR(100) NOT NULL,
    e_photo BLOB,
    d_id VARCHAR(4),
    e_designation VARCHAR(50),
    e_group CHAR(1) NOT NULL,
    e_date_of_joining DATE NOT NULL,
    e_DOB DATE,
    PRIMARY KEY (e_id),
    UNIQUE KEY (e_mobile_number),
    FOREIGN KEY (d_id) REFERENCES department(d_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Employee Bank Details Table
CREATE TABLE emp_bank_details (
    e_id CHAR(5) NOT NULL,
    e_name VARCHAR(30) NOT NULL,
    e_bank_name VARCHAR(50) NOT NULL,
    e_bank_acc_number BIGINT NOT NULL,
    e_pan_number CHAR(10) NOT NULL,
    e_bank_IFSC CHAR(11) NOT NULL,
    e_cpf_or_gpf_number INT DEFAULT NULL,
    PRIMARY KEY (e_id),
    UNIQUE KEY (e_bank_acc_number),
    UNIQUE KEY (e_pan_number),
    FOREIGN KEY (e_id) REFERENCES emp_details(e_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Employee Deduction Details Table
CREATE TABLE emp_deduction_details (
    e_id CHAR(5) NOT NULL,
    e_name VARCHAR(30) NOT NULL,
    leave_days INT DEFAULT NULL,
    leave_deduction_amount INT DEFAULT NULL,
    deduction_CPF INT DEFAULT NULL,
    GIS INT DEFAULT NULL,
    house_rent INT DEFAULT NULL,
    water_charges INT DEFAULT NULL,
    electricity_charges INT DEFAULT NULL,
    vehicle_deduction INT DEFAULT NULL,
    HB_loan INT DEFAULT NULL,
    GPF_loan INT DEFAULT NULL,
    festival_loan INT DEFAULT NULL,
    grain_charges INT DEFAULT NULL,
    bank_advance INT DEFAULT NULL,
    advance INT DEFAULT NULL,
    RGPV_advance INT DEFAULT NULL,
    income_tax INT DEFAULT NULL,
    professional_tax INT DEFAULT NULL,
    PRIMARY KEY (e_id),
    FOREIGN KEY (e_id) REFERENCES emp_details(e_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Employee Earning Details Table
CREATE TABLE emp_earning_details (
    e_id CHAR(5) NOT NULL,
    e_name VARCHAR(30) NOT NULL,
    basic_salary INT NOT NULL,
    special_pay INT DEFAULT NULL,
    dearness_allowance INT DEFAULT NULL,
    DA INT DEFAULT NULL,
    ADA INT DEFAULT NULL,
    interim_relief INT DEFAULT NULL,
    HRA INT DEFAULT NULL,
    CCA INT DEFAULT NULL,
    conveyance INT DEFAULT NULL,
    medical INT DEFAULT NULL,
    washing_allowance INT DEFAULT NULL,
    BDP INT DEFAULT NULL,
    arrears INT DEFAULT NULL,
    PRIMARY KEY (e_id),
    FOREIGN KEY (e_id) REFERENCES emp_details(e_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Salary Archive Table
CREATE TABLE salary_archive (
    e_id CHAR(5) NOT NULL,
    salary_month VARCHAR(10) NOT NULL,
    salary_year INT NOT NULL,
    e_name VARCHAR(30) NOT NULL,
    basic_salary INT NOT NULL,
    special_pay INT DEFAULT NULL,
    dearness_allowance INT DEFAULT NULL,
    DA INT DEFAULT NULL,
    ADA INT DEFAULT NULL,
    interim_relief INT DEFAULT NULL,
    HRA INT DEFAULT NULL,
    CCA INT DEFAULT NULL,
    conveyance INT DEFAULT NULL,
    medical INT DEFAULT NULL,
    washing_allowance INT DEFAULT NULL,
    BDP INT DEFAULT NULL,
    arrears INT DEFAULT NULL,
    leave_days INT DEFAULT NULL,
    leave_deduction_amount INT DEFAULT NULL,
    deduction_CPF INT DEFAULT NULL,
    GIS INT DEFAULT NULL,
    house_rent INT DEFAULT NULL,
    water_charges INT DEFAULT NULL,
    electricity_charges INT DEFAULT NULL,
    vehicle_deduction INT DEFAULT NULL,
    HB_loan INT DEFAULT NULL,
    GPF_loan INT DEFAULT NULL,
    festival_loan INT DEFAULT NULL,
    grain_charges INT DEFAULT NULL,
    bank_advance INT DEFAULT NULL,
    advance INT DEFAULT NULL,
    RGPV_advance INT DEFAULT NULL,
    income_tax INT DEFAULT NULL,
    professional_tax INT DEFAULT NULL,
    total_earning INT DEFAULT NULL,
    total_deduction INT DEFAULT NULL,
    net_payable INT DEFAULT NULL,
    PRIMARY KEY (e_id, salary_month, salary_year),
    FOREIGN KEY (e_id) REFERENCES emp_details(e_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;