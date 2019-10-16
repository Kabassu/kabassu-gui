import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddView from "../components/kabassu/adddialogs/AddView";

export default class AddViewPage extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Create View'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddView />
        </div>
      </div>
    </AdminLayoutHoc>
  }
}