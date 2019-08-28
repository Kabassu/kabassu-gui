const initialstate = {
  definitionId: '',
  jvm: '',
  message: null,
  description: ''
}

class AddTestRequest extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.state.definitionId=this.props.id;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'definitionIdInput') {
      this.setState({definitionId: e.target.value});
    } else if (e.target.id === 'jvmInput') {
      this.setState({jvm: e.target.value});
    }else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
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
        body: JSON.stringify({
          definitionId: this.state.definitionId,
          jvm: this.state.jvm,
          description: this.state.description,
          configurationId: "string",
          additionalData: {},
        })
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

  render() {
    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="definitionIdInput">Definition Id</label>
              <input type="text" className="form-control"
                     id="definitionIdInput" aria-describedby="definitionIdHelp"
                     placeholder="Enter definition id"  value={this.state.definitionId}/>
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default AddTestRequest