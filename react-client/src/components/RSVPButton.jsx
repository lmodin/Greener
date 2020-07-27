import React from 'react';

function RSVPButton (props) {
  if (props.eventFull) {
    return (
      <button onClick={((e) => {props.RSVPtoEvent(e, props.event, props.project)})} className="disabled" className="event_rsvp_button_full">Event Full</button>
    )
  } else {
    return (
      <button onClick={((e) => {props.RSVPtoEvent(e, props.event, props.project)})} className="event_rsvp_button">RSVP</button>
    )
  }
}

export default RSVPButton;