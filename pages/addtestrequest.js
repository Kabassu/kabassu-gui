import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddTestRequest from "../components/kabassu/adddialogs/AddTestRequest";

export default class AddTestRequestPage extends React.Component {

  static async getInitialProps({req, query: {id}}) {
    if(typeof id === 'undefined'){
      id = ''
    }
    return {
      id: id
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Create Test Request'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddTestRequest id = {this.props.id} />
        </div>
      </div>
    </AdminLayoutHoc>
  }
}