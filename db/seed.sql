INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 200000, 4),
    ('Lawyer', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike','Incognito', 4, null),
    ('Miranda', 'Mogollon', 2 , 1),
    ('Isabella', 'Cardenas', 5, 3),
    ('Jane', 'Doe', 2, 1),
    ('John', 'Smith', 3, 4),
    ('Sandra', 'Interdonato', 4, 6),
    ('Cesar', 'Zegarra', 5, null),
    ('Giuliana', 'Chavez', 6, null);
 