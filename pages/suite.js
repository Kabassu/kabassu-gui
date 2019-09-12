import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataListParametrized from "../components/kabassu/DataListParametrized";
import Link from "next/link";
import SuiteRunTable from "../components/kabassu/tables/SuiteRunTable";
import DataListFiltered from "../components/kabassu/DataListFiltered";
import DefinitionsTable from "../components/kabassu/tables/DefinitionsTable";

export default class Suite extends React.Component {

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
      filters: []
    };
    this.prepareDefinitions = this.prepareDefinitions.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  prepareDefinitions() {
    this.setState({
      filters:  [
          {
            filterName: "_id",
            filterValues: typeof this.state.result.definitions !== 'undefined' ? this.state.result.definitions.map(item => item) : []
          }
        ]
    })
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getsuite/' + this.props.id,
        {
          crossDomain: true,
          method: 'GET',
        })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result,
          });
          this.prepareDefinitions()
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  render() {

    return <AdminLayoutHoc contentTitle={'Suite Definition Details'}
                           contentTitleButton={
                             <Link href={'/addsuiterun?id='+this.state.result._id}><a
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
              <span className="info-box-text">Description</span>
              <span
                  className="info-box-number">{this.state.result.description}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<DefinitionsTable/>}
                            collection="kabassu-definitions"
                            filters={this.state.filters}
                            title="List of definitions"/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListParametrized table={<SuiteRunTable/>}
                                collection="kabassu-suite-runs"
                                field="suiteId" value={this.props.id}
                                title="List of executions"/>
        </div>
      </div>


    </AdminLayoutHoc>
  }
}