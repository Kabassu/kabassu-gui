const initialstate = {
  definitionId: '',
  jvm: '',
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
    this.onSubmit = this.onSubmit.bind(this);
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'definitionIdInput') {
      this.setState({definitionId: e.target.value});
    } else if (e.target.id === 'jvmInput') {
      this.setState({jvm: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
    } else if (e.target.id === 'parameterNameInput') {
      this.setState({possibleParameterName: e.target.value});
    } else if (e.target.id === 'parameterValueInput') {
      this.setState({possibleParameterValue: e.target.value});
    }
  }

  validate(state) {
    return state.definitionId !== '' && state.jvm !== '';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/test/run", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.generateRequest())
      });

      this.setState({
        jvm: '',
        definitionId: '',
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
      jvm: this.state.jvm,
      description: this.state.description,
      configurationId: "string",
      additionalData: {},
    }
    this.state.parameters.forEach(function(value, key){
      request.additionalData[key] = value
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
              <label htmlFor="jvmInput">JVM</label>
              <input type="text" className="form-control"
                     id="jvmInput" aria-describedby="jvmHelp"
                     placeholder="Enter jvm" value={this.state.jvm}/>
              <small id="jvmHelp" className="form-text text-muted">
                Enter existing jvm
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control"
                        rows="4"></textarea>
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddTestRequest