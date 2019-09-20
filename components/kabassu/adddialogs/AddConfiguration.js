import CreatableSelect from 'react-select/creatable';
import {parametersOptions, parametersValues} from "../../data/data";

const initialstate = {
  name: '',
  description: '',
  suggestedType: 'execution',
  message: null,
  parameters: new Map(),
  possibleParameterName: '',
  possibleParameterValue: '',
}

class AddConfiguration extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onParameterNameChange = this.onParameterNameChange.bind(this);
    this.onParameterValueChange = this.onParameterValueChange.bind(this);
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
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
    } else if (e.target.id === 'suggestedTypeInput') {
      this.setState({suggestedType: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '' && state.parameters.size >0;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/addconfiguration", {
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
        description: '',
        suggestedType: 'execution',
        parameters: new Map(),
        possibleParameterName: '',
        possibleParameterValue: '',
        message: <div className="alert alert-success" role="alert">
          Configuration send
        </div>
      });
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong configuration
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
      description: this.state.description,
      suggestedType: this.state.suggestedType,
      parameters: {},
    }
    this.state.parameters.forEach(function (value, key) {
      request.parameters[key] = value
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
                Enter name for configuration
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea rows="4" className="form-control"
                     id="descriptionInput" aria-describedby="descriptionHelp"
                     placeholder="Enter Description" value={this.state.description}/>
              <small id="descriptionHelp" className="form-text text-muted">
                Enter description
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="suggestedTypeInput">Suggested Type</label>
              <select id="suggestedTypeInput" className="form-control"
                      value={this.state.suggestedType}>
                <option value="execution">Execution</option>
                <option value="definition">Definition</option>
                <option value="other">Other</option>
              </select>
            </div>
            {this.generateLocationOptions()}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddConfiguration