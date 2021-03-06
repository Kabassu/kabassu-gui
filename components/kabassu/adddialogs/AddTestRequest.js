import CreatableSelect from 'react-select/creatable';
import {parametersOptions, parametersValues} from "../../data/data";

const initialstate = {
  definitionId: '',
  configurationId: '',
  message: null,
  description: '',
  parameters: new Map(),
  possibleParameterName: '',
  possibleParameterValue: '',
}

class AddTestRequest extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.state.definitionId = this.props.id;
    this.onChange = this.onChange.bind(this);
    this.onParameterNameChange = this.onParameterNameChange.bind(this);
    this.onParameterValueChange = this.onParameterValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  };

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
    if (e.target.id === 'definitionIdInput') {
      this.setState({definitionId: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
    } else if (e.target.id === 'configurationInput') {
      this.setState({configurationId: e.target.value});
    }
  }

  validate(state) {
    return state.definitionId !== '';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/test/run", {
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
        definitionId: '',
        configurationId: '',
        parameters: new Map(),
        message: <div className="alert alert-success" role="alert">
          Request send
        </div>
      });
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong request
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
      definitionId: this.state.definitionId,
      description: this.state.description,
      configurationId: this.state.configurationId,
      additionalParameters: {},
    }
    this.state.parameters.forEach(function (value, key) {
      request.additionalParameters[key] = value
    })
    return request
  }

  render() {

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

    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="definitionIdInput">Definition Id</label>
              <input type="text" className="form-control"
                     id="definitionIdInput" aria-describedby="definitionIdHelp"
                     placeholder="Enter definition id"
                     value={this.state.definitionId}/>
              <small id="definitionIdHelp" className="form-text text-muted">
                Enter existing definition Id
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control"
                        rows="4"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="configurationInput">Configuration Id</label>
              <input type="text" className="form-control"
                     id="configurationInput"
                     aria-describedby="configurationHelp"
                     placeholder="Enter configuration id"
                     value={this.state.configurationId}/>
              <small id="configurationHelp" className="form-text text-muted">
                Enter existing configuration Id
              </small>
            </div>
            <div className="form-group">
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddTestRequest