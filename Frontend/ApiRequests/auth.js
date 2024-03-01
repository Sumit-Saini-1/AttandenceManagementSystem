import { SERVER_URL } from "./global";

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
