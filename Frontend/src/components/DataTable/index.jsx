import PropTypes from 'prop-types';
import Style from "./style.module.css";
import { useEffect, useState } from 'react';
import { GetAttandeceData } from '../../../ApiRequests/Data';
import { Button, Popconfirm, Space, Table } from 'antd';

export default function DataTable() {
    const [attandenceData, setAttandenceData] = useState([]);
    const cols = [
        {
            title: "event name",
            dataIndex: "eventname"
        },
        {
            title: "date",
            dataIndex: "date"
        },
        {
            title: "time",
            dataIndex: "time"
        },
        {
            title: "attendeename",
            dataIndex: "attendeename"
        },
        {
            title: "status",
            dataIndex: "status"
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
                return (
                    <Space>
                        <Popconfirm title="Are you sure" onConfirm={() => { }}>
                            <Button type='primary' danger>Delete</Button>
                        </Popconfirm>
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
            <Table dataSource={attandenceData} columns={cols}></Table>
        </>
    );
}
