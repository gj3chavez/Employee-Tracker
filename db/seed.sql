INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

    id  name       
--  -----------
1   Sales      
2   Engineering
3   Finance    
4   Legal      


INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 200000, 4),
    ('Lawyer', 180000, 4);

    id  title              department   salary
--  -----------------  -----------  ------
8   Sales Lead         Sales        100000
9   Salesperson        Sales        80000 
10  Lead Engineer      Engineering  200000
11  Software Engineer  Engineering  180000
12  Accountant         Finance      125000
13  Legal Team Lead    Legal        200000
14  Lawyer             Legal        180000



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike','Incognito', 8, null),
    ('Miranda', 'Mogollon', 9 , null),
    ('Isabella', 'Cardenas', 10, null),
    ('Jane', 'Doe', 11, null),
    ('John', 'Smith', 12, null),
    ('Sandra', 'Interdonato',14, null),
    ('Cesar', 'Zegarra', 11, null),
    ('Giuliana', 'Chavez', 13, null);


    id  first_name    last_name    title              department   salary  manager         
--  ------------  -----------  -----------------  -----------  ------  ----------------
33  Mike          Incognito    Sales Lead         Sales        100000  null            
34  Miranda       Mogollon     Salesperson        Sales        80000   null            
35  Isabella      Cardenas     Lead Engineer      Engineering  200000  null            
36  Jane          Doe          Software Engineer  Engineering  180000  null            
37  John          Smith        Accountant         Finance      125000  null            
38  Sandra        Interdonato  Lawyer             Legal        180000  null            
40  Giuliana      Chavez       Legal Team Lead    Legal        200000  null            
41  giana         chavez       Salesperson        Sales        80000   Miranda Mogollon
42  Giuliana      Chavez       Software Engineer  Engineering  180000  Miranda Mogollon
44  Isabel Arias  Arias        Software Engineer  Engineering  180000  John Smith      
45  Mikaella      Lujan        Lead Engineer      Engineering  200000  Miranda Mogollon

 