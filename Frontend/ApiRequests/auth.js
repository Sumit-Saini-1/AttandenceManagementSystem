import { SERVER_URL,getToken } from "./global";

export function LoginApi(email, password) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }).then(response => {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
        })
    });
}

export function CheckAuthentication(){
    return new Promise((resolve, reject) => {
        if(!getToken()){
            resolve(false);
            return;
        }
        fetch(SERVER_URL + "/checkauthenticate", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token:getToken() })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                reject(false);
            }
        }).catch(function (err) {
            console.log(err);
            reject(false);
        });
    });
}