import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import AddTestRequest from "../components/kabassu/AddTestRequest";
import AddSuiteRun from "../components/kabassu/adddialogs/AddSuiteRun";

export default class AddSuiteRunPage extends React.Component {

  static async getInitialProps({req, query: {id}}) {
    if(typeof id === 'undefined'){
      id = ''
    }
    return {
      id: id
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Create Suite Execution'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <AddSuiteRun id = {this.props.id} />
        </div>
      </div>
    </AdminLayoutHoc>
  }
}