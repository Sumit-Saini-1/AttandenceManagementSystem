import {  useState } from 'react'
import style from './style.module.css'

import { Button, Modal, message } from 'antd'
import Input from '../input'
import { AddNewEntryApi } from '../../../ApiRequests/Data'

export default function Header() {
    
    const [modal,setModal] = useState(false)
    const [eventname,setEventName]=useState("")
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [attendeename,setAttendeeName]=useState("")
    const [status,setStatus]=useState("");

    return (
        <div className={style.header}>
            <div className={style.left}>
                <h2>Attendance Management</h2>
            </div >
            <div className={style.right}>
                <Button onClick={()=>{setModal(true)}}>Enter new</Button>
                
            </div>
            
            <Modal title="Add entry" onCancel={ev=>{
                setModal(false)
            }} 
            onOk={ev=>{
                if(!eventname.trim()||!date||!time||!attendeename.trim()||!status.trim()){
                    alert("Enter all data")
                    return
                }
                let eventobj={
                    'event':eventname.trim(),
                    date,
                    time,
                    'attendee':attendeename,
                    status
                }
                AddNewEntryApi(eventobj).then(res=>{
                    if(res){
                        alert("success")
                    }
                    setModal(false)
                })
            }} 
            open={modal}>
               <Input value={eventname} onChange={(ev)=>setEventName(ev.target.value)} placeholder={"Enter Event Name"}/>
               <Input type={"date"} value={date} onChange={(ev)=>setDate(ev.target.value)}  placeholder={"Enter Event Date"} /> 
               <Input type={"time"} value={time} onChange={(ev)=>setTime(ev.target.value)} placeholder={"Enter Event time"} /> 
               <Input value={attendeename} onChange={(ev)=>setAttendeeName(ev.target.value)} placeholder={"Enter Attendee Name"} /> 
               <Input value={status} onChange={(ev)=>setStatus(ev.target.value)} placeholder={"Enter Status"} /> 
            </Modal>
        </div>
    )
}