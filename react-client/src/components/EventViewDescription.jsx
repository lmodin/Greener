import React from 'react';

function EventViewDescription (props) {
    return (
      <div>
        <h1>{props.event.name}</h1>
        {props.event.description} <br />
        Date: {props.event.date} <br />
        Cleaners requested: {props.event.peopleRequested} <br />
        Cleaners attending: {props.event.peopleRSVPd}
        </div>
    )
}

export default EventViewDescription;