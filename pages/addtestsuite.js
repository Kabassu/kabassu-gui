import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddTestSuite from "../components/kabassu/AddTestSuite";

export default class AddTestSuitePage extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Create Test Suite'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddTestSuite/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}