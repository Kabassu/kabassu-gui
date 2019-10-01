import AdminLayoutHoc from '../../components/Layout/AdminLayoutHoc';
import DescriptionStep from "../../components/kabassu/wizards/DescriptionStep";

export default class WizardGradle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wizardState: 0,
    };
    this.upgradeState = this.upgradeState.bind(this)
  }

  upgradeState(props) {
    this.setState(
        props
    );
  }

  renderStep(){
    if(this.state.wizardState == 0){
      return <DescriptionStep upgrade={this.upgradeState}/>
    }
  }

  renderButtons(){

    
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
          {this.renderStep()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {this.renderButtons()}
        </div>
      </div>
    </AdminLayoutHoc>
  }
}