import React from 'react';
import Moment from 'react-moment';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      extras: [],
      name: '',
      peopleRequested: 10,
      date: '',
      description: '',
    };
    //console.log('New Event props: ', props)
    this.handleChange = this.handleChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.getEvent = this.getEvent.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }
  handleCheck(e) {
    e.preventDefault();
    if (e.target.name === "small") {
      const name = "small items for pickup"
    } else if (e.target.name === "large") {
      const name = "large items to be hauled"
    } else if (e.target.name === "rough") {
      const name = "rough terrain"
    } else if (e.target.name === "water") {
      const name = "waders preferred for water cleanup"
    }
    if(this.state.extras.indexOf(name) > -1) {
      this.setState({extras: this.state.extras.splice(this.state.extras.indexOf(name), 1)
      })
    } else {
      this.setState({
        extras: this.state.extras.push(name)
      })
    }
  }
  getEvent() {
    var event = {
      project: this.props.project.name,
      name: this.state.name,
      peopleRequested: this.state.peopleRequested,
      peopleRSVPd: 1,
      attendees: [],
      date: this.state.date,
      extras: [],
      description: this.state.description,
    }
    return event;
  }
  handleEventSubmit(e) {
    e.preventDefault();
    let event = this.getEvent();
    fetch('/events/newEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(this.setState({submitted: true}))
  }

  render () {
    if (this.state.submitted) {
      return (
        <div className="new_event_page">
          Thank you for creating a new Event for the {this.props.project.name} project. <br />
          <button className="return_to_project_button" onClick={((e) => this.props.refreshProjects(e, this.props.project))}>Return to Project</button>
          <button className="view_new_event_button" onClick={((e) => this.props.viewEvent(e, this.getEvent(), this.props.project))}>View Event</button>
        </div>
      )
    }
    return (
      <div className="new_event_page">
       <h1>Create a new event for {this.props.project.name}</h1>
       <form className="new_event_page" onSubmit={this.handleEventSubmit}>
         <label>
           Event name:
           <input type="text" name="name" onChange={this.handleChange}/>
         </label><br />
         <label>
           Cleaners Requested:
           <select value={this.state.peopleRequested} name="peopleRequested" onChange={this.handleChange}>
             <option value="10">Up to 10</option>
             <option value="20">Up to 20</option>
            </select>
         </label><br />
         <label>
           Date:
           <input type="date" name="date"
             value={<Moment></Moment>}
             min={<Moment></Moment>}
             max={<Moment>"2021-05-06"</Moment>}
             onChange={this.handleChange} />
         </label><br />
         <label>
           Extras: <br />
           <input type="checkbox" name="small" onChange={this.handleCheck}>
           </input> small items for pickup <br />
           <input type="checkbox" name="large" onChange={this.handleCheck}>
           </input>large items to be hauled <br />
           <input type="checkbox" name="rough" onChange={this.handleCheck}>
           </input>rough terrain <br />
           <input type="checkbox" name="water" onChange={this.handleCheck}>
           </input>waders preferred for water cleanup
         </label><br />
         <label>
           Description:
           <input type="text" name="description" onChange={this.handleChange} />
         </label>
         <input type="submit" value="Submit" className="event_submit_button"/>
       </form><br />
       Reminder for cleaners: You are responsible for your own safety, and for bringing your own equipment. <br />
       We recommend you bring sturdy gloves, trash pickers, several heavy duty trash bags, water and food.<br />
       <button className="cancel_event_button" onClick={((e) => this.props.viewProject(e, this.props.project))}>Cancel</button>
      </div>
    )
  }
}

export default CreateEvent;