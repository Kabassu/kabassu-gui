import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddTestRequest from "../components/kabassu/AddTestRequest";

export default class AddTestRequestPage extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Create Test Request'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddTestRequest/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}