const initialstate = {
  name: '',
  description: '',
  definitions: new Map(),
  possibleDefinition: null
}

class AddTestSuite extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addDefinitions = this.addDefinitions.bind(this);
    this.removeDefinitions = this.removeDefinitions.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
    }else if (e.target.id === 'definitionsInput') {
      this.setState({possibleDefinition: e.target.value});
    }
  }

  validate(state) {
    return state.name !== '' && state.description !== ''
        && state.definitions.size !== 0;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/addsuite", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          definitions: Array.from(this.state.definitions.values())
        })
      });

      this.setState({
        name: '',
        description: '',
        definitions: new Map(),
        message: <div className="alert alert-success" role="alert">
          Suite send
        </div>
      });
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong Suite
        </div>
      });
    }

  }

  addDefinitions(e) {
    if(this.state.possibleDefinition!==null && this.state.possibleDefinition!==''){
      this.state.definitions.set(this.state.possibleDefinition,this.state.possibleDefinition);
      this.setState({
        possibleDefinition: ''
      })
    }
  }

  removeDefinitions(e) {
      this.state.definitions.delete(e.target.value);
      this.setState({
        definitions: this.state.definitions
      })

  }

  render() {
    let addedDefinitions = Array.from(this.state.definitions, ([key, value]) =>
        <tr>
          <td>{value}</td>
          <td><button type="button" className="btn-danger" onClick={this.removeDefinitions} value={value}><i className="fa fa-remove"/></button></td>
        </tr>
    );
    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control"
                     id="nameInput" aria-describedby="nameHelp"
                     placeholder="Enter Name" value={this.state.name}/>
              <small id="nameHelp" className="form-text text-muted">
                Enter name for suite
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control"
                        rows="4" value={this.state.description}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="definitionsInput">Definitions</label>
              <table className="table table-hover table-bordered">
                <thead className="thead-dark">
                <tr>
                  <th>Definition Id</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>{addedDefinitions}</tbody>
              </table>
              <div className="form-row">
                <div className="col">
                  <input type="text" className="form-control"
                         id="definitionsInput" aria-describedby="nameHelp"
                         placeholder="Enter Definition Id" value={this.state.possibleDefinition}/>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-info btn-flat"
                          onClick={this.addDefinitions}>Add definition
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

export default AddTestSuite