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
      result: {}
    };
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
    return <AdminLayoutHoc contentTitle={'Request Details'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>

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