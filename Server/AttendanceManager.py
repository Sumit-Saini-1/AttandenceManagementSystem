from db import db

cursor = db.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS attendancedata (id INT AUTO_INCREMENT PRIMARY KEY, eventname VARCHAR(100), date VARCHAR(100), time VARCHAR(15), attendeename VARCHAR(50), status VARCHAR(20),entryby VARCHAR(50) );")
class AttendanceManager:
    def createEntry(self, event, date, time, attendee, status,entryby):
        query = "INSERT INTO attendancedata (eventname, date, time, attendeename, status,entryby) VALUES (%s, %s, %s, %s, %s,%s)"
        values = (event, date, time, attendee, status,entryby)
        cursor.execute(query, values)
        db.commit()

    def showData(self):
        cursor.execute("SELECT * FROM attendancedata")
        cols=[x[0] for x in cursor.description]
        # print(cols)
        data = cursor.fetchall()
        ad=[dict(zip(cols,r)) for r in data]
        # user = dict(zip(cols,data))
        return ad
