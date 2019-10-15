import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import RequestsTable from "../components/kabassu/tables/RequestsTable";
import Link from "next/link";
import SuiteRunTable from "../components/kabassu/tables/SuiteRunTable";
import DataListFiltered from "../components/kabassu/DataListFiltered";

export default class view extends React.Component {

  static async getInitialProps({req, query: {id}}) {
    return {
      id: id,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: {},
      filtersExecutions: [],
      filtersSuites: []
    };
    this.prepareExecutionsId = this.prepareExecutionsId.bind(this);
    this.prepareSuitesId = this.prepareSuitesId.bind(this);
    this.refreshView = this.refreshView.bind(this);

  }

  refreshView(id){
    this.fetchData();
  }


  componentDidMount() {
    this.fetchData();
  }

  prepareExecutionsId() {
    this.setState({
      filtersExecutions:  [
        {
          filterName: "_id",
          filterValues: typeof this.state.result.executionId !== 'undefined' ? this.state.result.executionId.map(item => item) : ['no data']
        }
      ]
    })
  }

  prepareSuitesId() {
    this.setState({
      filtersSuites:  [
        {
          filterName: "_id",
          filterValues: typeof this.state.result.suiteRunId !== 'undefined' ? this.state.result.suiteRunId.map(item => item) : ['no data']
        }
      ]
    })
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getview/' + this.props.id,
        {
          crossDomain: true,
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer '+ process.env.token,
          }),
        })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
          this.prepareExecutionsId()
          this.prepareSuitesId()
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  render() {

    return <AdminLayoutHoc contentTitle={'View Details'}
                           contentTitleButton={
                             <Link href={'/index'}><a
                                 className={"btn btn-lg bg-gradient-green "}>Back to index</a></Link>
                           } url={this.props.url}>
      <div className="row">
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa fa-star-o"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">ID</span>
              <span className="info-box-number">{this.state.result._id}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa fa-star-o"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Name</span>
              <span className="info-box-number">{this.state.result.name}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Description</span>
              <span
                  className="info-box-number">{this.state.result.description}</span>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<RequestsTable viewId={this.props.id} refresh={this.refreshView}/>}
                            collection="kabassu-requests"
                            filters={this.state.filtersExecutions}
                            title="List of executions"/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<SuiteRunTable viewId={this.props.id} refresh={this.refreshView}/>}
                            collection="kabassu-suite-runs"
                            filters={this.state.filtersSuites}
                            title="List of suite executions"/>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}