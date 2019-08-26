import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import ResultsTable from "../components/kabassu/ResultsTable";
import DataListParametrized from "../components/kabassu/DataListParametrized";
import RequestDetails from "../components/kabassu/RequestDetails";
import DefinitionDetails from "../components/kabassu/DefinitionDetails";
import HistoryTable from "../components/kabassu/HistoryTable";
import SingleTestReports from "../components/kabassu/SingleTestReports";

export default class Request extends React.Component {

  static async getInitialProps({req, query: {id}}) {
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
      message: null,
      enableRerun: false
    };
    this.rerunTest = this.rerunTest.bind(this);
  }

  rerunTest() {
    if (this.state.enableRerun) {
      this.state.enableRerun = false;
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
            if (result._id !== null) {
              this.setState({
                message: <div className="alert alert-success" role="alert">
                  Rerun request send
                </div>,
                result: result
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
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getrequest/' + this.props.id, {
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
    var disabled = this.state.result.status == 'finished' ? '' : 'disabled';
    this.state.enableRerun = this.state.result.status == 'finished';
    return <AdminLayoutHoc contentTitle={'Request Details'} contentTitleButton={
      <button type="button"
              className={"btn btn-lg bg-gradient-green " + disabled}
              onClick={this.rerunTest}>
        <i className="fa fa-repeat"></i> Run Again
      </button>} url={this.props.url}>
      {this.state.message}
      <div className="row">
        <RequestDetails result={this.state.result}/>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="info-box">
            <span className="info-box-icon bg-warning"><i
                className="fa fa-copy"></i></span>
            <div className="info-box-content">
              <span className="info-box-number">Description</span>
              <div>
                {this.state.result.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <DefinitionDetails id={this.state.result.definitionId}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <HistoryTable items={this.state.result.history}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListParametrized table={<ResultsTable/>}
                                collection="kabassu-results"
                                field="testRequest._id" value={this.props.id}
                                title="List of test results"/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <SingleTestReports testId={this.props.id}/>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}