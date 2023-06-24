import React from 'react';

export class Timer extends React.Component {

    render() {
        const moment = this.props.moment;
        if (moment === null) {
            return (null)
        }
        const hour = moment.hour < 10 ? `0${moment.hour}` : `${moment.hour}`;
        const minute = moment.minute < 10 ? `0${moment.minute}` : `${moment.minute}`;
        const second = moment.second < 10 ? `0${moment.second}` : `${moment.second}`;
        return (
            <div>Logged in at {moment.year}/{moment.monthValue}/{moment.dayOfMonth} {hour}:{minute}:{second}</div>
        )
    }

}