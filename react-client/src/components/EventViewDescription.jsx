import React from 'react';
import Moment from 'react-moment';

function EventViewDescription(props) {
  return (
    <div>
      <h1>{props.event.name}</h1>
      {props.event.description} <br />
        Date: <Moment>{props.event.date}</Moment> <br />
        Cleaners requested: Up to {props.event.peopleRequested} <br />
        Cleaners attending: {props.event.peopleRSVPd}
    </div>
  )
}

export default EventViewDescription;