import Link from "next/link";
import AdditionalParameters from "../AdditionalParameters";

class DefinitionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {}
    }
  }

  fetchData() {
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
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
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
              <td>Additional Parameters</td>
              <td>
                <AdditionalParameters configurationId={this.state.result.configurationId} additionalParameters={this.state.result.additionalParameters}/>
              </td>
            </tr>
            <tr>
              <td>Reports</td>
              <td>{ typeof this.state.result.reports!=='undefined' ? this.state.result.reports.map((item,key) => <div key={key}>{item}</div>) : ''}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td><Link href={'/definition?id=' + this.state.result._id}><a className="nav-link">Show
                Details</a></Link></td>
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