from db import db

cursor = db.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS attendancedata (id INT AUTO_INCREMENT PRIMARY KEY, eventname VARCHAR(100), date VARCHAR(100), time VARCHAR(15), attendeename VARCHAR(50), status VARCHAR(20),entryby VARCHAR(50) );")
class AttendanceManager:
    def createEntry(self, event, date, time, attendee, status):
        query = "INSERT INTO attendancedata (eventname, date, time, attendeename, status) VALUES (%s, %s, %s, %s, %s)"
        values = (event, date, time, attendee, status)
        cursor.execute(query, values)
        db.commit()

    def showData(self):
        cursor.execute("SELECT * FROM attendancedata")
        data = cursor.fetchall()
        return data
