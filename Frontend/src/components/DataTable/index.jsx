import { useEffect, useState } from 'react';
import { DeleteEntryApi, GetAttandeceData, UpdateEntryApi } from '../../../ApiRequests/Data';
import { Button, Popconfirm, Space, Table, Modal, } from 'antd';
import Input from '../input';

export default function DataTable() {
    const [attandenceData, setAttandenceData] = useState([]);
    const [modal, setModal] = useState(false);
    const [eventname, setEventName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [attendeename, setAttendeeName] = useState("")
    const [status, setStatus] = useState("");
    const cols = [
        {
            title: "event name",
            dataIndex: "eventname",
            key: "eventname"
        },
        {
            title: "date",
            dataIndex: "date",
            key: 'date'
        },
        {
            title: "time",
            dataIndex: "time",
            key: 'time'
        },
        {
            title: "attendeename",
            dataIndex: "attendeename",
            key: "attendeename"
        },
        {
            title: "status",
            dataIndex: "status",
            key: 'status'
        },
        {
            title: "Action",
            dataIndex: "id",
            key: 'id',
            render: (id, obj) => {
                return (
                    <Space>
                        <Popconfirm title="Are you sure" onConfirm={() => {
                            DeleteEntryApi(obj.id).then((res) => {
                                if (res) {
                                    alert("deleted")
                                    setAttandenceData(attandenceData.filter(v => v.id != obj.id))
                                }
                                else {
                                    alert("something went wrong")
                                }
                            })
                        }}>
                            <Button type='primary' danger>Delete</Button>
                        </Popconfirm>
                        <Button type='primary' onClick={()=>{setModal(!modal)}}>Edit</Button>
                    </Space>
                )
            }
        },
    ]

    useEffect(function () {
        GetAttandeceData().then(data => {
            if (data) {
                // console.log(data);
                setAttandenceData(data?.data);
            }
            else {
                setAttandenceData([])
            }
        })
    }, [])
    return (
        <>
            <Modal title="Add entry" onCancel={() => {
                setModal(false)
            }}
                onOk={() => {
                    if (!eventname.trim() || !date || !time || !attendeename.trim() || !status.trim()) {
                        alert("Enter all data")
                        return
                    }
                    let eventobj = {
                        'event': eventname.trim(),
                        date,
                        time,
                        'attendee': attendeename,
                        status
                    }
                    UpdateEntryApi(eventobj).then(res => {
                        if (res) {
                            alert("success")
                        }
                        setModal(false)
                    })
                }}
                open={modal}>
                <Input value={eventname} onChange={(ev) => setEventName(ev.target.value)} placeholder={"Enter Event Name"} />
                <Input type={"date"} value={date} onChange={(ev) => setDate(ev.target.value)} placeholder={"Enter Event Date"} />
                <Input type={"time"} value={time} onChange={(ev) => setTime(ev.target.value)} placeholder={"Enter Event time"} />
                <Input value={attendeename} onChange={(ev) => setAttendeeName(ev.target.value)} placeholder={"Enter Attendee Name"} />
                <Input value={status} onChange={(ev) => setStatus(ev.target.value)} placeholder={"Enter Status"} />
            </Modal>
            <Table rowKey={(r) => r.id} dataSource={attandenceData} columns={cols}></Table>
        </>
    );
}
