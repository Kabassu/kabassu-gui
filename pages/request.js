import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import RequestsTable from "../components/kabassu/RequestsTable";
import DefinitionsTable from "../components/kabassu/DefinitionsTable";
import ResultsTable from "../components/kabassu/ResultsTable";
import DataListParametrized from "../components/kabassu/DataListParametrized";

export default class Request extends React.Component {

  static async getInitialProps({req, query: { id }}) {
    return {
      id: id
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Request Details'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>

      <div className="row">
        <div className="col-sm-12">
          
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