import React from 'react';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
    //console.log('RSVP View props: ', props)
    this.handleChange = this.handleChange.bind(this);
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    this.getProject = this.getProject.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  getProject() {
    var project = {
      name: '',
      location: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      owner: 'Bob Loblaw',
      status: 'dirty',
      type: '',
      description: ''
    }
  }

  handleProjectSubmit(e) {
    e.preventDefault();
    let project = this.getProject()
    fetch('/projects/newProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(this.setState({ submitted: true }))
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="rsvp_page">
          Thank you for creating a new project! <br />
          <button className="return_to_project_button" onClick={((e) => this.props.refreshProjects(e, this.props.project))}>Return to Projects</button>
          <button onClick={((e) => { this.props.refreshProjects(e, getProject()) })} >View Project</button>
        </div>
      )
    }
    return (
      <div className="new_project_page">
        <h1>Create a New Project</h1>
        <form className="new_project_form" onSubmit={this.handleProjectSubmit}>
          <label>
            Name:
           <input type="text" name="name" onChange={this.handleChange} />
          </label><br />
          {/* <label>
            Location: <br />
            <label>
              input type="number" name="street" onChange={this.handleChange} />
            </label>
          </label><br /> */}
          <input type="submit" value="RSVP" className="rsvp_submit_button" />
        </form><br />
       Reminder for cleaners: You are responsible for your own safety, and for bringing your own equipment. <br />
       We recommend you bring sturdy gloves, trash pickers, several heavy duty trash bags, water and food.<br />
        <button className="cancel_rsvp_button" onClick={((e) => this.props.viewEvent(e, this.props.event, this.props.project))}>Cancel</button>
      </div>
    )
  }
}

export default CreateProject;