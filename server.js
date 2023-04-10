const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function start() {
    inquirer.prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee',
            'Remove employee',
            'Update employee role',
            'Update employee manager',
            'View all roles',
            'Add role',
            'Remove role',
            'View all departments',
            'Add department',
            'Remove department',
            'Quit'
        ]
    })
    .then((answer) => {
        switch (answer.start) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all employees by department':
                viewAllEmployeesByDepartment();
                break;
            case 'View all employees by manager':
                viewAllEmployeesByManager();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Remove role':
                removeRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Remove department':
                removeDepartment();
                break;
            case 'Quit':
                quit();
                break;
        }
    })
};

function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllEmployeesByDepartment() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY department.name;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllEmployeesByManager() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employee\'s role ID?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the employee\'s manager ID?'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleId}, ${answer.managerId});`, (err, res) => {
            if (err) throw err;
            console.log('Employee added.');
            start();
        });
    });
};

function removeEmployee() {
    inquirer.prompt({
        type: 'input',
        name: 'employeeId',
        message: 'What is the ID of the employee you would like to remove?'
    })
    .then((answer) => {
        db.query(`DELETE FROM employee WHERE id = ${answer.employeeId};`, (err, res) => {
            if (err) throw err;
            console.log('Employee removed.');
            start();
        });
    });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the ID of the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the new role ID?'
        }
    ])
    .then((answer) => {
        db.query(`UPDATE employee SET role_id = ${answer.roleId} WHERE id = ${answer.employeeId};`, (err, res) => {
            if (err) throw err;
            console.log('Employee role updated.');
            start();
        });
    });
};

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the ID of the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the new manager ID?'
        }
    ])
    .then((answer) => {
        db.query(`UPDATE employee SET manager_id = ${answer.managerId} WHERE id = ${answer.employeeId};`, (err, res) => {
            if (err) throw err;
            console.log('Employee manager updated.');
            start();
        });
    });
};


function viewAllRoles() {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID of the role you would like to add?'
        }
    ])
    .then((answer) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.departmentId});`, (err, res) => {
            if (err) throw err;
            console.log('Role added.');
            start();
        });
    });
};

function removeRole() {
