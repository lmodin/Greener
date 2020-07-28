import React from 'react';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      owner: '',
      type: '',
      description: '',
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
      name: this.state.name,
      location: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
      },
      owner: 'Bob Loblaw',
      status: 'dirty',
      type: this.state.type,
      description: this.state.description
    }
    return project
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
        <div className="new_project_page">
          Thank you for creating a new project! <br />
          <button className="styled_button" onClick={((e) => this.props.refreshProjects(e, this.props.project))}>Return to Projects</button>
          <button className="styled_button" onClick={((e) => { this.props.refreshProjects(e, getProject()) })} >View Project</button>
        </div>
      )
    }
    return (
      <div className="new_project_page">
        <h1>Create a New Project</h1>
        <form className="new_project_form" onSubmit={this.handleProjectSubmit}>
          <label>
            Project Name:
           <input type="text" name="name" onChange={this.handleChange} required/>
          </label><br />
          <label>
            Location: <br />
            <label>
              Street:
              <input type="text" name="street" onChange={this.handleChange} required/>
            </label><br />
            <label>
              City:
              <input type="text" name="city" onChange={this.handleChange} required/>
            </label><br />
            <label>
              State:
              <input type="text" name="state" onChange={this.handleChange} required/>
            </label><br />
            <label>
              Zip:
              <input type="text" name="zip" onChange={this.handleChange} required/>
            </label>
          </label><br />
          <label>
            Your Name:
            <input type="text" name="owner" onChange={this.handleChange} required/>
          </label><br />
          <label htmlFor="type">
            Type:
            <select name="type" onChange={this.handleChange} required >
              <option value="road-side cleanup">road-side cleanup</option>
              <option value="river-side cleanup">river-side cleanup</option>
            </select>
          </label><br />
          <label>
            Description:
            <input type="text" name="description" onChange={this.handleChange} required/>
          </label> <br />
          <input type="submit" value="Create Project" className="styled_button" />
        </form><br />
        <button className="styled_button" onClick={((e) => this.props.viewProjects(e))}>Cancel</button>
      </div>
    )
  }
}

export default CreateProject;