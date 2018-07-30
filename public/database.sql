DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Member;

CREATE TABLE Member(
Userid    INTEGER PRIMARY KEY AUTOINCREMENT,
FirstName VARCHAR(100) NOT NULL,
Surname   VARCHAR(100) NOT NULL,
Email     VARCHAR(100)  UNIQUE NOT NULL,
Degree    VARCHAR(100)  NOT NULL,
EndDate   INT     NOT NULL,
Password  VARCHAR(100)
);

CREATE TABLE Events(
Eventid  INTEGER PRIMARY KEY AUTOINCREMENT,
Name     VARCHAR(100)     NOT NULL,
Date     DATETIME         NOT NULL,
Time     TIME         NOT NULL,
Location VARCHAR(100)     NOT NULL,
Description  VARCHAR(100)   NULL
);

CREATE TABLE Attendance(
Userid    INTEGER NOT NULL,
Eventid   INTEGER NOT NULL,
FOREIGN KEY (Userid) REFERENCES Member(Userid),
FOREIGN KEY (Eventid) REFERENCES Events(Eventid),
PRIMARY KEY (Userid, Eventid)
);

INSERT INTO Member (FirstName, Surname, Email, Degree, EndDate, Password)
VALUES ("Philippa", "Day", "pd14041@my.bristol.ac.uk", "Biology", 2018, "vince");

INSERT INTO Events (Name, Date, Time, Location, Description)
VALUES ("Cake Sale", "2019-02-04", "09:30:00", "Bristol", "Welcome");
VALUES ("Salon Night", "2019-02-03", "09:00:00", "University", "Come along and try some glitter");
VALUES ("Zumba", "2019-01-03", "08:00:00", "Gym", "Lets get fit!");

INSERT INTO Attendance (Userid, Eventid)
VALUES (100, 001);
