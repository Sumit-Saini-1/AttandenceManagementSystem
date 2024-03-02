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
        data = cursor.fetchall()
        ad=[dict(zip(cols,r)) for r in data]
        return ad
    
    def getEntry(self,id):
        query="SELECT * FROM attendancedata WHERE id=%s"
        values=(id,)
        cursor.execute(query,values)
        cols=[x[0] for x in cursor.description]
        data=cursor.fetchone()
        return dict(zip(cols,data))

    def deleteEntry(self,id,deleteby):
        flag=False
        if deleteby=='admin':
            flag=True
        else:
            row=self.getEntry(id)
            if row['entryby']==deleteby:
                flag=True
        
        if flag:
            query="DELETE FROM attendancedata WHERE id=%s"
            values=(id,)
            try:
                cursor.execute(query,values)
                db.commit()
                return True
            except Exception as err:
                print(err)
                return False
        else:
            return False
    
    def updateEntry(self,id, event, date, time, attendee, status,updateby):
        flag=False
        if updateby=='admin':
            flag=True
        else:
            row=self.getEntry(id)
            if row['entryby']==updateby:
                flag=True
        
        if flag:
            query = "UPDATE attendancedata SET eventname=%s, date=%s, time=%s, attendeename=%s, status=%s WHERE id=%s"
            values = (event, date, time, attendee, status,id)
            try:
                cursor.execute(query, values)
                db.commit()
                return True
            except Exception as err:
                print(err)
                return False
        else:
            return False
        
        