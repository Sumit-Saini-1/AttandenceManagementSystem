from flask import Flask, request, jsonify
import mysql.connector as sql
from flask_cors import CORS,cross_origin
from user import User
from AttendanceManager import AttendanceManager
from JWTToken import encodeData,decodeData

app = Flask(__name__)
CORS(app)

header = {  
  "alg": "HS256",  
  "typ": "JWT"  
}  
  
secret = "temporary"  


@app.route('/signup', methods=['POST'])
@cross_origin(origins=[u"*"])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # print(email,password,username)
    if not username or not email or not password:
        return jsonify({'message': 'All fields are required!'}), 400

    # Check if the user already exists
    if User.get_user(email):
        return jsonify({'message': 'User already exists!'}), 409

    # Create a new user
    User.create_user(username, email, password)
    return jsonify({'message': 'User created successfully!'}), 201


@app.route('/login', methods=['POST'])
@cross_origin(origins=[u"*"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(email,password)
    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    user = User.get_user(email)
    if user and user['password'] == password: 
        token=encodeData(user['username'],user['email'])
        return jsonify({'message': 'Login successful!', 'token': token}), 200
    else:
        return jsonify({'message': 'Invalid email or password!'}), 401


@app.route('/attendance', methods=['POST','GET','DELETE','PUT'])
@cross_origin(origins=[u"*"])
def attendance():
    token = request.headers.get("authorization")
    if token==None or token=="":
        return jsonify({"err":"unauthorised access"}),401
    
    match request.method:
        case 'GET':
            am = AttendanceManager()
            data = am.showData()
            return jsonify({'data': data}), 200
        
        case 'POST':
            
            
            try:
                auth = decodeData(token)
                request_data = request.get_json()
                event = request_data['event']
                date = request_data['date']
                time = request_data['time']
                attendee = request_data['attendee']
                status = request_data['status']
                am = AttendanceManager()
                am.createEntry(event, date, time, attendee, status,auth['email'])
                return jsonify({'message': 'Entry created successfully'}), 200
            except Exception as e:
                return jsonify(e),500
            
        case 'DELETE':
            try:
                auth = decodeData(token)
                request_data = request.get_json()
                rowid = request_data['id']
                am = AttendanceManager()
                deleted=am.deleteEntry(rowid,auth['email'])
                if deleted:
                    return jsonify({'message': 'Entry deleted successfully'}), 200
                else:
                    return jsonify({'message':'Something wrong'}),500
            except Exception as e:
                return jsonify(e),500
            
        case 'PUT':
            try:
                auth = decodeData(token)
                request_data = request.get_json()
                rowid = request_data['id']
                event = request_data['event']
                date = request_data['date']
                time = request_data['time']
                attendee = request_data['attendee']
                status = request_data['status']
                am = AttendanceManager()
                updated=am.updateEntry(rowid,event,date,time,attendee,status,auth['email'])
                if updated:
                    return jsonify({'message': 'Entry deleted successfully'}), 200
                else:
                    return jsonify({'message':'Something wrong'}),500
            except Exception as e:
                return jsonify(e),500
    


if __name__ == '__main__':
    app.run(debug=True)
