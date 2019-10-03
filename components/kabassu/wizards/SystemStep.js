import WizardButtons from "./WizardButtons";
import Select from "react-select";
import {jvmValues} from "../../data/data";

class SystemStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    if (typeof this.state.jvm === 'undefined') {
      this.state.jvm = {value: '1.8', label: '1.8'}
    }
    if (typeof this.state.runnerOptions === 'undefined') {
      this.state.runnerOptions = "clean test"
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onJVMChange = this.onJVMChange.bind(this);

  }

  onJVMChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {jvm: value});
    }
  }

  onChange(e) {
    if (e.target.id === 'runnerOptionsInput') {
      this.setState({runnerOptions: e.target.value});
    }
  }

  nextStep() {
    this.state.showWarning = false
    this.props.updateState(this.state)
    this.props.nextStep()

  }

  previousStep() {
    this.props.previousStep()
  }

  showWarning() {
    if (this.state.showWarning) {
      return <div className="alert alert-danger" role="alert">
        Please fill gradle parameters
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
                  onChange={this.onJVMChange}
                  options={jvmValues}
                  value={this.state.jvm}/>
            </div>
            <div className="form-group">
              <label htmlFor="runnerOptionsInput">Gradle Parameters</label>
              <input type="text" className="form-control"
                     id="runnerOptionsInput" aria-describedby="nameHelp"
                     value={this.state.runnerOptions}/>
              <small id="nameHelp" className="form-text text-muted">
                Enter where test can be found
              </small>
            </div>
            <WizardButtons nextStep={this.nextStep}
                           previousStep={this.previousStep}
                           displayPrevious={this.props.displayPrevious}
                           displayNext={this.props.displayNext}/>
          </form>
        </>
    );
  }
}

export default SystemStep