import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import RequestsTable from "../components/kabassu/RequestsTable";
import DefinitionsTable from "../components/kabassu/DefinitionsTable";

export default class Request extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Request Details'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>

    </AdminLayoutHoc>
  }
}