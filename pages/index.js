import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import RequestsTable from "../components/kabassu/RequestsTable";
import DefinitionsTable from "../components/kabassu/DefinitionsTable";
import ResultsTable from "../components/kabassu/ResultsTable";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <DataList table={<DefinitionsTable/>} collection="kabassu-definitions" title="List of test definitions"/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <DataList table={<RequestsTable/>} collection="kabassu-requests" title="List of test requests"/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}