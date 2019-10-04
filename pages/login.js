import LoginForm from "../components/kabassu/login/LoginForm";
import LoginLayout from "../components/Layout/LoginLayout";

export default class Login extends React.Component {

  render() {
    return <LoginLayout contentTitle={'Home'} contentTitleButton={<i
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
    </LoginLayout>
  }
}