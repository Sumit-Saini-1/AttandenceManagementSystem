import { SERVER_URL } from "./global";

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
