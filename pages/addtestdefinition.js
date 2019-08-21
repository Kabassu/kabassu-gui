import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddTestDefinition from "../components/kabassu/AddTestDefinition";

export default class AddTestRequestPage extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Create Test Definition'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddTestDefinition/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}