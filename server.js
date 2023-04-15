const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const logo = require('asciiart-logo');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
db.connect(function(err) {
    if (err) throw err;
    console.log(
        logo({
            name: 'Employee Tracker',
            font: 'Speed',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-pink',
            textColor: 'pink',
        })
        .render()
    );
    console.log('Welcome to the Employee Tracker!');
    start();
});
    
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
        ],
    })
    .then(function(answer){
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
                db.end();
                console.log('Have a wonderful day!');
                console.log(
                    logo({
                        name: 'Goodbye!',   
                        font: 'Speed',
                        lineChars: 10,
                        padding: 2,
                        margin: 3,
                        borderColor: 'grey',
                        logoColor: 'bold-pink',
                        textColor: 'pink',
                    })
                    .render()
                );
                break;
        }
    })
}

function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM role;`, (err, res) => {
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


async function addEmployee() {
const [role] = await db.promise().query(`SELECT * FROM role;`);

const [employee] = await db.promise().query(`SELECT * FROM employee;`);

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
            type: 'list',
            name: 'roleId',
            message: 'What is the employee\'s role?',
            choices: role.map((role) => {
                return {name: role.title, value: role.id}
            })
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'What is the employee\'s manager?',
            choices: employee.map((employee) => {
                return {name: employee.first_name + " " + employee.last_name, value: employee.id}
            })
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

async function addDepartment() {
const [department] = await db.promise().query(`SELECT * FROM employee;`);
    inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department you would like to add?'
    })
    .then((answer) => {
        db.query(`INSERT INTO department (name) VALUES ('${answer.departmentName}');`, (err, res) => {
            if (err) throw err;
            console.log('Department added.');
            start();
        });
    });
};

function removeDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'What is the ID of the department you would like to remove?'
    })
    .then((answer) => {
        db.query(`DELETE FROM department WHERE id = ${answer.departmentId};`, (err, res) => {
            if (err) throw err;
            console.log('Department removed.');
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

async function addRole() {
   const [role] = await db.promise().query(`SELECT * FROM employee;`);
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
    inquirer.prompt({
        type: 'input',
        name: 'roleId',
        message: 'What is the ID of the role you would like to remove?'
    })
    .then((answer) => {
        db.query(`DELETE FROM role WHERE id = ${answer.roleId};`, (err, res) => {
            if (err) throw err;
            console.log('Role removed.');
            start();
        });
    });
};

endApp = () => {
    console.log('Goodbye!');
    process.exit();
}








