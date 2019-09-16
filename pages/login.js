import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import Cookies from "js-cookie";

export default class Index extends React.Component {

  componentDidMount() {
    document.cookie = `token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY4NjE2MzA4fQ.vvTuW1lvhY8LrqrdCGOXfs36T93gkJpuj9qkh4DX-vQ`;
  }

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
    </AdminLayoutHoc>
  }
}