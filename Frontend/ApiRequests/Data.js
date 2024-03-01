import { SERVER_URL,getToken } from "./global";

export function GetAttandeceData(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/show",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
        }).then(response=>{
            if(response.status==200){
                resolve(response.json());
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        })
    });
}

export function AddNewEntryApi(event){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization':getToken()
            },
            body: JSON.stringify(event)
        }).then(response => {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
        })
    });
}
