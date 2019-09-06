import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddConfiguration from "../components/kabassu/adddialogs/AddConfiguration";

export default class AddConfigurationPage extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Create Configuration'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddConfiguration/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}