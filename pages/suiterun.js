import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import ResultsTable from "../components/kabassu/ResultsTable";
import DataListParametrized from "../components/kabassu/DataListParametrized";
import RequestDetails from "../components/kabassu/RequestDetails";
import DefinitionDetails from "../components/kabassu/DefinitionDetails";
import HistoryTable from "../components/kabassu/HistoryTable";
import SingleTestReports from "../components/kabassu/SingleTestReports";
import RequestsTable from "../components/kabassu/RequestsTable";
import DataListFiltered from "../components/kabassu/DataListFiltered";
import SuiteDetails from "../components/kabassu/SuiteDetails";

export default class SuiteRun extends React.Component {

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
      enableRerun: false,
      filters: []
    };
    this.prepareRequests = this.prepareRequests.bind(this);
  }

  prepareRequests() {
    this.setState({
      filters:  [
        {
          filterName: "_id",
          filterValues: typeof this.state.result.requests !== 'undefined' ? this.state.result.requests.map(item => item) : []
        }
      ]
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getsuiterun/' + this.props.id, {
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
          this.prepareRequests()
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
    return <AdminLayoutHoc contentTitle={'Suit Execution Details'} contentTitleButton={
      <button type="button"
              className={"btn btn-lg bg-gradient-green disabled"}       >
        <i className="fa fa-repeat"></i> Run Again
      </button>} url={this.props.url}>
      {this.state.message}
      <div className="row">
        <div className="col-sm-6">
          <div className="info-box">
            <span className="info-box-icon bg-warning"><i
                className="fa fa-copy"></i></span>
            <div className="info-box-content">
              <span className="info-box-number">Id</span>
              <div>
                {this.state.result._id}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <SuiteDetails id={this.state.result.suiteId}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<RequestsTable/>}
                                collection="kabassu-requests"
                                filters={this.state.filters}
                                title="List of test executions"/>
        </div>
      </div>


    </AdminLayoutHoc>
  }
}