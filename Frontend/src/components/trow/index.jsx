import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function Trow(props) {
    const { eventname, date, time, attendeename, status } = props;
    return (
        <tr>
            <td>{eventname}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{attendeename}</td>
            <td>{status}</td>
        </tr>
    );
}

Trow.defaultProps = {

}

Trow.propTypes = {
    eventname: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    attendeename: PropTypes.string,
    status: PropTypes.string
}