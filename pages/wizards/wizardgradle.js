import AdminLayoutHoc from '../../components/Layout/AdminLayoutHoc';
import DescriptionStep from "../../components/kabassu/wizards/DescriptionStep";
import LocationStep from "../../components/kabassu/wizards/LocationStep";
import SystemStep from "../../components/kabassu/wizards/SystemStep";
import ReportsStep from "../../components/kabassu/wizards/ReportsStep";
import GradleDisplay from "../../components/kabassu/wizards/GradleDisplay";
import EndStep from "../../components/kabassu/wizards/EndStep";
import AfterStep from "../../components/kabassu/wizards/AfterStep";
import ViewStep from "../../components/kabassu/wizards/ViewStep";

const MAX_STATE = 5;

export default class WizardGradle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wizardState: 0,
    };
    this.upgradeState = this.upgradeState.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)

  }

  upgradeState(props) {
    this.setState(
        props
    );
  }

  renderStep() {
    if (this.state.wizardState == 0) {
      return <DescriptionStep existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {false} displayNext = {true} />
    }
    if (this.state.wizardState == 1) {
      return <LocationStep  existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {true} displayNext = {true} />
    }
    if (this.state.wizardState == 2) {
      return <SystemStep  existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {true} displayNext = {true} />
    }
    if (this.state.wizardState == 3) {
      return <ReportsStep  existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {true} displayNext = {true} />
    }
    if (this.state.wizardState == 4) {
      return <ViewStep  existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {true} displayNext = {true} />
    }
    if (this.state.wizardState == 5) {
      return <EndStep  existingState = {this.state} updateState={this.upgradeState} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {true} displayNext = {false} />
    }
    if (this.state.wizardState == 1000 || this.state.wizardState == 1001) {
      return <AfterStep  existingState = {this.state} nextStep={this.nextStep} previousStep={this.previousStep} displayPrevious = {false} displayNext = {false} />
    }
  }

  previousStep() {
    if (this.state.wizardState !== 0) {
      this.setState({
        wizardState: (this.state.wizardState - 1)
          }
      );
    }
  }

  nextStep() {
    if (this.state.wizardState !== MAX_STATE) {
      this.setState({
        wizardState: (this.state.wizardState + 1)
          }
      );
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-widget widget-user">
            <div className="widget-user-header bg-success">
              <h5 className="widget-user-desc text-center">Wizard: Gradle
                Test</h5>
            </div>
            <div className="widget-user-image">
              <img className="img-circle elevation-2"
                   src="/static/images/kabassu.png" alt="User Avatar"/>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12">
                  <GradleDisplay state = {this.state}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {this.renderStep()}
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}