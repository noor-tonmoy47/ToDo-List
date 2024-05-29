CREATE TABLE users(
    username varchar(20) PRIMARY KEY,
    user_email varchar(30),
    user_password varchar(100)
);

CREATE TABLE lists(
    task_ID INT PRIMARY KEY AUTO_INCREMENT, 
    username varchar(20),
    content varchar(50),
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
);