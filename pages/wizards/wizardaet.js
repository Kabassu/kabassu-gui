import AdminLayoutHoc from '../../components/Layout/AdminLayoutHoc';
import DescriptionStep from "../../components/kabassu/wizards/DescriptionStep";
import LocationStep from "../../components/kabassu/wizards/LocationStep";
import AfterStep from "../../components/kabassu/wizards/AfterStep";
import AETSystemStep from "../../components/kabassu/wizards/aet/AETSystemStep";
import AETCustomStep from "../../components/kabassu/wizards/aet/AETCustomStep";
import AETEndStep from "../../components/kabassu/wizards/aet/AETEndStep";
import AETDisplay from "../../components/kabassu/wizards/aet/AETDisplay";

const MAX_STATE = 4;

export default class WizardAET extends React.Component {

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
      return <DescriptionStep existingState={this.state}
                              updateState={this.upgradeState}
                              nextStep={this.nextStep}
                              previousStep={this.previousStep}
                              displayPrevious={this.state.wizardState > 0}
                              displayNext={this.state.wizardState < MAX_STATE}/>
    }
    if (this.state.wizardState == 1) {
      return <LocationStep existingState={this.state}
                           updateState={this.upgradeState}
                           nextStep={this.nextStep}
                           previousStep={this.previousStep}
                           displayPrevious={this.state.wizardState > 0}
                           displayNext={this.state.wizardState < MAX_STATE}/>
    }
    if (this.state.wizardState == 2) {
      return <AETSystemStep existingState={this.state}
                            updateState={this.upgradeState}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            displayPrevious={this.state.wizardState > 0}
                            displayNext={this.state.wizardState < MAX_STATE}/>
    }
    if (this.state.wizardState == 3) {
      return <AETCustomStep existingState={this.state}
                            updateState={this.upgradeState}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            displayPrevious={this.state.wizardState > 0}
                            displayNext={this.state.wizardState < MAX_STATE}/>
    }
    if (this.state.wizardState == 4) {
      return <AETEndStep existingState={this.state}
                         updateState={this.upgradeState}
                         nextStep={this.nextStep}
                         previousStep={this.previousStep}
                         displayPrevious={this.state.wizardState > 0}
                         displayNext={this.state.wizardState < MAX_STATE}/>
    }
    if (this.state.wizardState == 5 || this.state.wizardState == 6) {
      return <AfterStep existingState={this.state} nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        displayPrevious={this.state.wizardState > 0}
                        displayNext={this.state.wizardState < MAX_STATE}/>
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
              <h5 className="widget-user-desc text-center">Wizard: AET
                Test</h5>
            </div>
            <div className="widget-user-image">
              <img className="img-circle elevation-2"
                   src="/static/images/kabassu.png" alt="User Avatar"/>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12">
                  <AETDisplay state={this.state}/>
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