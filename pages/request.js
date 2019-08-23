import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import ResultsTable from "../components/kabassu/ResultsTable";
import DataListParametrized from "../components/kabassu/DataListParametrized";
import RequestDetails from "../components/kabassu/RequestDetails";
import DefinitionDetails from "../components/kabassu/DefinitionDetails";

export default class Request extends React.Component {

  static async getInitialProps({req, query: { id }}) {
    return {
      id: id
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: {},
      message: null
    };
    this.rerunTest = this.rerunTest.bind(this);
  }

  rerunTest() {
    fetch(process.env.kabassuServer + "/kabassu/test/rerun", {
      method: 'POST',
      crossDomain: true,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestId: this.props.id
      })
    }).then(res => res.json())
    .then(
        (result) => {
          if(result._id!==null){
            this.setState({
              message: <div className="alert alert-success" role="alert">
                Rerun request send
              </div>
            });
          } else {
            this.setState({
              message: <div className="alert alert-danger" role="alert">
                Test Request not found
              </div>
            });
          }
        },
        (error) => {
          this.setState({
            message: <div className="alert alert-danger" role="alert">
              Problem with server
            </div>
          });
        }
    )
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getrequest/'+this.props.id, {
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

  render() {
    return <AdminLayoutHoc contentTitle={'Request Details'} contentTitleButton={
      <button type="button" className="btn btn-lg bg-gradient-green" onClick={this.rerunTest}>
        <i className="fa fa-repeat" ></i> Run Again
      </button>} url={this.props.url}>
      {this.state.message}
      <div className="row">
          <RequestDetails result={this.state.result}/>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DefinitionDetails id={this.state.result.definitionId}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListParametrized table={<ResultsTable/>} collection="kabassu-results" field="testRequest.id" value={this.props.id} title="List of test results"/>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}