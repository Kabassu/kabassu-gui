class DefinitionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {}
    }
  }

  fetchData() {
    console.log(this.props.id)
    fetch(process.env.kabassuServer + '/kabassu/getdefinition/'
        + this.props.id, {
      crossDomain: true,
      method: 'GET',
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    )
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== null && this.props.id
        !== prevProps.id) {
      this.fetchData()
    }
  }

  render() {
    return <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fa fa-television"/>&nbsp;Definition details
          </h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool"
                    data-widget="collapse"
                    data-toggle="tooltip" title="Collapse">
              <i className="fa fa-minus"/>
            </button>
          </div>
        </div>
        <div className="card-body scroll">
          <div className="alert alert-dark" role="alert">
            Definition {this.state.result.name}
          </div>

          <table className="table table-hover table-bordered">
            <tbody>
            <tr>
              <td>Id</td>
              <td>{this.state.result._id}</td>
            </tr>
            <tr>
              <td>Runner</td>
              <td>{this.state.result.runner}</td>
            </tr>
            <tr>
              <td>Location Type</td>
              <td>{this.state.result.locationType}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{this.state.result.location}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right text-muted">
        </div>
      </div>
    </>
  }

}

export default DefinitionDetails