CREATE TABLE tbl_100_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    accessCode VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tbl_100_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    destination VARCHAR(255) NOT NULL,
    vacationType VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES tbl_100_users(id)
);
