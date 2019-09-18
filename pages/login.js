import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import LoginForm from "../components/kabassu/login/LoginForm";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-widget widget-user">
            <div className="widget-user-header bg-info"/>
            <div className="widget-user-image">
              <img className="img-circle elevation-2"
                   src="/static/images/kabassu.png" alt="User Avatar"/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LoginForm/>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}