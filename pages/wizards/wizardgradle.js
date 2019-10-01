import AdminLayoutHoc from '../../components/Layout/AdminLayoutHoc';

export default class WizardGradle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wizardState: 0,
    };
  }

  

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-widget widget-user">
            <div className="widget-user-header bg-success">
              <h5 className="widget-user-desc text-center">Wizard: Gradle Test</h5>
            </div>
            <div className="widget-user-image">
              <img className="img-circle elevation-2"
                   src="/static/images/kabassu.png" alt="User Avatar"/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">

        </div>
      </div>
    </AdminLayoutHoc>
  }
}