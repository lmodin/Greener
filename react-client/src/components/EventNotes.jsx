import React from 'react';

function EventNotes (props) {
  //console.log('Event Notes props: ', props)
    return (
      <div>
        Notes from organizer: <br />
        {props.event.extras.map((note) => {
          return <div className="event_extras_notes_item">{note}</div>
        })}
      </div>
    )
}

export default EventNotes;