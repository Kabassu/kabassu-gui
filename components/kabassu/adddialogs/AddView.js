const initialstate = {
  name: '',
  message: null,
  description: '',
  executions: '',
}

class AddView extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
    }else if (e.target.id === 'executionsInput') {
      this.setState({executions: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/addview", {
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


  generateRequest() {
    var request = {
      name: this.state.name,
      description: this.state.description,
      executionId: this.state.executions.replace(/\s+/g, '').split(","),
    }
    return request
  }

  render() {

    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control"
                     id="nameInput" aria-describedby="definitionIdHelp"
                     placeholder="Enter name"
                     value={this.state.name}/>
              <small id="definitionIdHelp" className="form-text text-muted">
                Enter name
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control"
                        rows="4"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="executionsInput">Single Executions (',' - splitter)</label>
              <textarea id="executionsInput" className="form-control"
                        rows="4"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddView