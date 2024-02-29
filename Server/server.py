from flask import Flask, request, jsonify
import mysql.connector as sql
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)

db = sql.connect(
    host="localhost",
    user="root",
    password="",
    database='AttendenceManagement'
)

cursor = db.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS attendancedata (id INT AUTO_INCREMENT PRIMARY KEY, eventname VARCHAR(100), date VARCHAR(100), time VARCHAR(15), attendeename VARCHAR(50), status VARCHAR(20));")

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

@app.route('/create', methods=['POST'])
@cross_origin(origins=[u"*"])
def create_entry():
    request_data = request.get_json()
    event = request_data['event']
    date = request_data['date']
    time = request_data['time']
    attendee = request_data['attendee']
    status = request_data['status']
    am = AttendanceManager()
    am.createEntry(event, date, time, attendee, status)
    return jsonify({'message': 'Entry created successfully'}), 200

@app.route('/show', methods=['GET'])
@cross_origin(origins=[u"*"])
def show_data():
    am = AttendanceManager()
    data = am.showData()
    return jsonify({'data': data}), 200

if __name__ == '__main__':
    app.run(debug=True)
