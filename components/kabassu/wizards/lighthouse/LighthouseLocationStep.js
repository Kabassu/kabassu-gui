import WizardButtons from "../WizardButtons";
import Select from "react-select";
import {locationTypes} from "../../../data/data";

class LighthouseLocationStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    if(typeof this.state.locationType === 'undefined'){
      this.state.locationType = { value: 'git', label: 'Git'}
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validation = this.validation.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onLocationTypeChange = this.onLocationTypeChange.bind(this);

  }

  onLocationTypeChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {locationType: value});
    }
  }

  validation() {
    return (typeof this.state.locationInput !== 'undefined' && this.state.locationInput !== '') || this.state.locationType.value === 'none';
  }

  onChange(e) {
    if (e.target.id === 'locationInput') {
      this.setState({locationInput: e.target.value});
    } else if (e.target.id === 'branchInput') {
      this.setState({branchInput: e.target.value});
    }
  }

  nextStep() {
    if (this.validation()) {
      this.state.showWarning = false
      this.props.updateState(this.state)
      this.props.nextStep()
    } else {
      this.setState({
        showWarning: true
      })
    }
  }

  previousStep() {
    this.props.previousStep()
  }

  showWarning() {
    if (this.state.showWarning) {
      return <div className="alert alert-danger" role="alert">
        Please enter test location
      </div>
    }
  }


  renderLocationName() {
    var location = "Disk Location"
    if(this.state.locationType.value === 'git'){
      location = "Respository addres"
    } else {
    }
    return location;
  }

  renderLocation() {
    if(this.state.locationType.value !== 'none'){
      return <div className="form-group">
        <label htmlFor="locationInput">{this.renderLocationName()}</label>
        <input type="text" className="form-control"
               id="locationInput" aria-describedby="nameHelp"
               value={this.state.locationInput}/>
        <small id="nameHelp" className="form-text text-muted">
          Enter where test can be found
        </small>
      </div>
    }
  }

  renderOptionalBranch() {
    if(this.state.locationType.value === 'git'){
      return <div className="form-group">
        <label htmlFor="branchInput">Branch</label>
        <input type="text" className="form-control"
               id="branchInput" aria-describedby="nameHelp"
               value={this.state.branchInput}/>
        <small id="nameHelp" className="form-text text-muted">
          Enter branch if it should be other then "master"
        </small>
      </div>
    }
  }

  render() {
    return (
        <>
          <form onChange={this.onChange}>
            {this.showWarning()}
            <div className="form-group">
              <label htmlFor="locationTypeInput">Location Type</label>
              <Select
                  onChange={this.onLocationTypeChange}
                  options={locationTypes}
                  value = {this.state.locationType} />
            </div>
            {this.renderLocation()}
            {this.renderOptionalBranch()}
            <WizardButtons nextStep={this.nextStep}
                           previousStep={this.previousStep}
                           displayPrevious={this.props.displayPrevious}
                           displayNext={this.props.displayNext}/>
          </form>
        </>
    );
  }

}

export default LighthouseLocationStep