import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import RequestsTable from "../components/kabassu/tables/RequestsTable";
import DataListParametrized from "../components/kabassu/DataListParametrized";
import Link from "next/link";
import AdditionalParameters from "../components/kabassu/AdditionalParameters";

export default class Definition extends React.Component {

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
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getdefinition/' + this.props.id,
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
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  render() {

    return <AdminLayoutHoc contentTitle={'Definition Details'}
                           contentTitleButton={
                             <Link href={'/addtestrequest?id=' + this.props.id}><a
                                 className={"btn btn-lg bg-gradient-green "}>Create
                               Execution</a></Link>
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
              <span className="info-box-text">Runner</span>
              <span
                  className="info-box-number">{this.state.result.runner}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Location Type</span>
              <span
                  className="info-box-number">{this.state.result.locationType}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Additional Parameters</span>
              <span
                  className="info-box-number"><AdditionalParameters
                  configurationId={this.state.result.configurationId}
                  additionalParameters={this.state.result.additionalParameters}/>
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Reports</span>
              <span
                  className="info-box-number">{typeof this.state.result.reports
              !== 'undefined' ? this.state.result.reports.map(
                  (item, key) => <div key={key}>{item}</div>) : ''}</span>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-sm-12">
          <DataListParametrized table={<RequestsTable/>}
                                collection="kabassu-requests"
                                field="definitionId" value={this.props.id}
                                title="List of requests"/>
        </div>
      </div>


    </AdminLayoutHoc>
  }
}