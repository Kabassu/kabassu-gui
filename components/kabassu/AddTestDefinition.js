const initialstate = {
  name: '',
  runner: 'gradle',
  locationType: 'filesystem',
  location: '',
  message: null,
  reports: ''
}

class AddTestDefinition extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'runnerInput') {
      this.setState({runner: e.target.value});
    }else if (e.target.id === 'locationTypeInput') {
      this.setState({locationType: e.target.value});
    }else if (e.target.id === 'locationInput') {
      this.setState({location: e.target.value});
    }else if (e.target.id === 'reportsInput') {
      this.setState({reports: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '' && state.runner !== '' && state.locationType !== '' && state.location !== '';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/adddefinition", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          runner: this.state.runner,
          locationType: this.state.locationType,
          location: this.state.location,
          reports: this.state.reports.split(",")
        })
      });

      this.setState({
        name: '',
        runner: 'gradle',
        locationType: 'filesystem',
        location: '',
        message: <div className="alert alert-success" role="alert">
          Definition send
        </div>
      });
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong definition
        </div>
      });
    }

  }

  render() {
    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control"
                     id="nameInput" aria-describedby="nameHelp"
                     placeholder="Enter Name" value={this.state.name}/>
                <small id="nameHelp" className="form-text text-muted">
                  Enter name for definition
                </small>
            </div>
            <div className="form-group">
              <label htmlFor="locationTypeInput">Runner</label>
              <input type="text" className="form-control"
                     id="runnerInput" aria-describedby="runnerHelp"
                     placeholder="Enter Runner" value={this.state.runner}/>
              <small id="runnerHelp" className="form-text text-muted">
                Enter existing runner
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="locationTypeInput">Location Type</label>
              <input type="text" className="form-control"
                     id="locationTypeInput" aria-describedby="locationTypeHelp"
                     placeholder="Enter Runner" value={this.state.locationType}/>
              <small id="locationTypeHelp" className="form-text text-muted">
                Enter existing location type
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="locationInput">Location</label>
              <input type="text" className="form-control"
                     id="locationInput" aria-describedby="locationHelp"
                     placeholder="Enter Location" value={this.state.location}/>
              <small id="locationHelp" className="form-text text-muted">
                Enter existing location
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="reportsInput">Reports</label>
              <input type="text" className="form-control"
                     id="reportsInput" aria-describedby="reportsHelp"
                     placeholder="Enter Reports" value={this.state.reports}/>
              <small id="reportsHelp" className="form-text text-muted">
                Enter reports to use with this definition
              </small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddTestDefinition