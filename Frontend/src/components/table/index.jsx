import PropTypes from 'prop-types';
import Style from "./style.module.css";
import { useEffect, useState } from 'react';
import { GetAttandeceData } from '../../../ApiRequests/Data';
import Trow from '../trow';
export default function Table() {
    const [attandenceData, setAttandenceData] = useState([]);

    useEffect(function () {
        GetAttandeceData().then(data => {
            if (data) {
                console.log(data);
                setAttandenceData(data?.data);
            }
            else {
                setAttandenceData([])
            }
        })
    }, [])
    return (
        <table className={Style.table}>
            <thead className={Style.thead}>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Attendee Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className={Style.tbody}>
                {
                    attandenceData.map((v, i) => {
                        return (
                            <Trow key={i} eventname={v[1]} date={v[2]} time={v[3]} attendeename={v[4]} status={v[5]} />
                        )
                    })
                }
            </tbody>
        </table>
    );
}
