const initialstate = {
  name: '',
  runner: 'gradle',
  locationType: 'filesystem',
  location: '',
  message: null,
  reports: '',
  parameters: new Map(),
  possibleParameterName: '',
  possibleParameterValue: '',
  runnerParams: "clean test"
}

class AddTestDefinition extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);
    this.generateRequest = this.generateRequest.bind(this);

  };

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'runnerInput') {
      this.setState({runner: e.target.value});
    } else if (e.target.id === 'locationTypeInput') {
      if (e.target.value === 'filesystem') {
        this.state.parameters = new Map()
      } else {
        this.state.location = ''
      }
      this.setState({locationType: e.target.value});
    } else if (e.target.id === 'locationInput') {
      this.setState({location: e.target.value});
    } else if (e.target.id === 'reportsInput') {
      this.setState({reports: e.target.value});
    } else if (e.target.id === 'runnerParamsInput') {
      this.setState({runnerParams: e.target.value});
    } else if (e.target.id === 'parameterNameInput') {
      this.setState({possibleParameterName: e.target.value});
    } else if (e.target.id === 'parameterValueInput') {
      this.setState({possibleParameterValue: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '' && state.runner !== '' && state.locationType
        !== '';
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
        body: JSON.stringify(this.generateRequest())
      });

      this.setState({
        name: '',
        runner: 'gradle',
        locationType: 'filesystem',
        location: '',
        parameters: new Map(),
        possibleParameterName: null,
        possibleParameterValue: null,
        reports: '',
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

  addParameters(e) {
    if (this.state.possibleParameterName !== null
        && this.state.possibleParameterName !== '') {
      this.state.parameters.set(this.state.possibleParameterName,
          this.state.possibleParameterValue);
      this.setState({
        possibleParameterName: '',
        possibleParameterValue: ''
      })
    }
  }

  removeParameters(e) {
    this.state.parameters.delete(e.target.value);
    this.setState({
      parameters: this.state.parameters
    })

  }

  generateRequest() {
    var request = {
      name: this.state.name,
      runner: this.state.runner,
      runnerOptions: this.state.runnerParams !== null
      && this.state.runnerParams !== '' ? this.state.runnerParams.split(" ")
          : [],
      locationType: this.state.locationType,
      additionalParameters: {},
      location: this.state.location,
      reports: this.state.reports.split(",")
    }
    this.state.parameters.forEach(function(value, key){
      request.additionalParameters[key] = value
    })
    console.log(request)
    return request
  }


generateLocationOptions()
{
  if (this.state.locationType === 'filesystem') {
    return <div className="form-group">
      <label htmlFor="locationInput">Location</label>
      <input type="text" className="form-control"
             id="locationInput" aria-describedby="locationHelp"
             placeholder="Enter Location" value={this.state.location}/>
      <small id="locationHelp" className="form-text text-muted">
        Enter existing location
      </small>
    </div>
  } else {
    let addedParameters = Array.from(this.state.parameters, ([key, value]) =>
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
          <td>
            <button type="button" className="btn-danger"
                    onClick={this.removeParameters} value={key}><i
                className="fa fa-remove"/></button>
          </td>
        </tr>
    );
    return <div className="form-group">
      <label htmlFor="definitionsInput">Additional Parameters</label>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>Parameter name</th>
          <th>Parameter value</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{addedParameters}</tbody>
      </table>
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control"
                 id="parameterNameInput" aria-describedby="nameHelp"
                 placeholder="Enter parameter name"
                 value={this.state.possibleParameterName}/>
        </div>
        <div className="col">
          <input type="text" className="form-control"
                 id="parameterValueInput" aria-describedby="nameHelp"
                 placeholder="Enter parameter value"
                 value={this.state.possibleParameterValue}/>
        </div>
        <div className="col">
          <button type="button" className="btn btn-info btn-flat"
                  onClick={this.addParameters}>Add parameter
          </button>
        </div>
      </div>
    </div>
  }
}

render()
{
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
            <label htmlFor="runnerParamsInput">Runner parameters</label>
            <input type="text" className="form-control"
                   id="runnerParamsInput" aria-describedby="runnerParamsHelp"
                   placeholder="Enter runner params"
                   value={this.state.runnerParams}/>
            <small id="runnerParamsHelp" className="form-text text-muted">
              Enter runner parameters (space as separator) optional
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="locationTypeInput">Location Type</label>
            <select id="locationTypeInput" className="form-control"
                    value={this.state.locationType}>
              <option value="filesystem">File System</option>
              <option value="git">Git</option>
            </select>
          </div>
          {this.generateLocationOptions()}
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