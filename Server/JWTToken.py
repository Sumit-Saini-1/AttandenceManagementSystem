import jwt 

header = {  
  "alg": "HS256",  
  "typ": "JWT"  
}  
  
secret = "temporary"  

def encodeData(username,email):
    payload = {
        'username':username,
        'email':email
    }

    token=jwt.encode(payload,secret,algorithm='HS256', headers=header)
    return token

def decodeData(token):
    auth = jwt.decode(token, secret, algorithms=['HS256'])
    return auth
