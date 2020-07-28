import React from 'react';
import RSVPButton from './RSVPButton.jsx';
import EventViewDescription from './EventViewDescription.jsx';
import EventNotes from './EventNotes.jsx'

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventFull: (this.props.event.peopleRSVPd >= this.props.event.peopleRequested)
    }
    //console.log('Event View props: ', this.props);
  }



  render () {
    return (
      <div className="event_page">
        <EventViewDescription className="event_page_description" event={this.props.event} />
        <EventNotes className="event_page_notes" event={this.props.event} />
        <button className="styled_button" onClick={((e) => {this.props.viewProject(e, this.props.project)})}>Back to Project</button>
        <RSVPButton
          eventFull={this.state.eventFull}
          RSVPtoEvent={this.props.RSVPtoEvent}
          event={this.props.event}
          project={this.props.project} />
        <button className="styled_button" onClick={((e) => {this.props.viewProjects(e)})} >View all Projects</button>
      </div>
    )
  }
}

export default EventView;