import CreatableSelect from 'react-select/creatable';
import {parametersOptions, parametersValues, locationTypes, runnerTypes, reportTypes} from "../../data/data";
import Select from 'react-select'

const initialstate = {
  name: '',
  configurationId: '',
  runner:   { value: 'gradle', label: 'Gradle'},
  locationType: { value: 'filesystem', label: 'File System'},
  message: null,
  reports: [],
  parameters: new Map(),
  possibleParameterName: '',
  possibleParameterValue: '',
}

class AddTestDefinition extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onLocationTypeChange = this.onLocationTypeChange.bind(this);
    this.onParameterNameChange = this.onParameterNameChange.bind(this);
    this.onParameterValueChange = this.onParameterValueChange.bind(this);
    this.onRunnerChange = this.onRunnerChange.bind(this);
    this.onReportChange = this.onReportChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);
    this.generateRequest = this.generateRequest.bind(this);

  };

  onRunnerChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {runner: value});
    }
  }

  onLocationTypeChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {locationType: value});
    }
  }

  onReportChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'remove-value') {
      if(value == null){
        value = []
      }
      this.setState(
          {reports: value});
    }
    if (action.action === 'clear') {
      this.setState(
          {reports: []});
    }
  }

  onParameterValueChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {possibleParameterValue: value.value});
    }
    if (action.action === 'clear') {
      this.setState(
          {possibleParameterValue: ''});
    }
  }

  onParameterNameChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {possibleParameterName: value.value});
    }
    if (action.action === 'clear') {
      this.setState(
          {possibleParameterName: ''});
    }
  }

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'configurationInput') {
      this.setState({configurationId: e.target.value});
    } else if (e.target.id === 'reportsInput') {
      this.setState({reports: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '' && typeof state.runner !== 'undefined' && typeof state.locationType
        !== "undefined";
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/adddefinition", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ process.env.token,
        },
        body: JSON.stringify(this.generateRequest())
      });

      this.setState({
        name: '',
        configurationId: '',
        runner: { value: 'gradle', label: 'Gradle'},
        locationType: { value: 'filesystem', label: 'File System'},
        parameters: new Map(),
        possibleParameterName: null,
        possibleParameterValue: null,
        reports: [],
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
      parameters: this.state.parameters,
      possibleParameterName: '',
      possibleParameterValue: ''
    })

  }

  generateRequest() {
    var request = {
      name: this.state.name,
      runner: this.state.runner.value,
      locationType: this.state.locationType.value,
      configurationId: this.state.configurationId,
      additionalParameters: {},
      reports: this.state.reports.map(report => report.value)
    }
    this.state.parameters.forEach(function (value, key) {
      request.additionalParameters[key] = value
    })
    return request
  }

  generateLocationOptions() {
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
          <CreatableSelect
              isClearable
              onChange={this.onParameterNameChange}
              onInputChange={this.onParameterNameChange}
              options={parametersOptions}

          />
        </div>
        <div className="col">
          <CreatableSelect
              isClearable
              onChange={this.onParameterValueChange}
              onInputChange={this.onParameterValueChange}
              options={parametersValues.get(this.state.possibleParameterName)}
          />
        </div>
        <div className="col">
          <button type="button" className="btn btn-info btn-flat"
                  onClick={this.addParameters}>Add parameter
          </button>
        </div>
      </div>
    </div>

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
              <label htmlFor="configurationInput">Configuration</label>
              <input type="text" className="form-control"
                     id="configurationInput" aria-describedby="configurationHelp"
                     placeholder="Enter Configuration" value={this.state.configurationId}/>
              <small id="configurationHelp" className="form-text text-muted">
                Enter existing configuration
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="locationTypeInput">Runner</label>
              <CreatableSelect
                  onChange={this.onRunnerChange}
                  onInputChange={this.onRunnerChange}
                  options={runnerTypes}
                  value = {this.state.runner}
              />
              <small id="runnerHelp" className="form-text text-muted">
                Enter existing runner
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="locationTypeInput">Location Type</label>
              <Select
                  onChange={this.onLocationTypeChange}
                  options={locationTypes}
                  value = {this.state.locationType} />
            </div>
            {this.generateLocationOptions()}
            <div className="form-group">
              <label htmlFor="reportsInput">Reports</label>
              <CreatableSelect
                  onChange={this.onReportChange}
                  onInputChange={this.onReportChange}
                  options={reportTypes}
                  value = {this.state.reports}
                  isMulti
              />
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