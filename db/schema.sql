DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
use employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT primary key,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT primary key,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    constraint fk_department foreign key (department_id) references department (id) on delete cascade
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    constraint fk_role foreign key (role_id) references role (id) on delete cascade,
    manager_id INT,
    constraint fk_manager foreign key (manager_id) references employee (id) on delete set null
);
