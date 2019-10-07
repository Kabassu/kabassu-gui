import WizardButtons from "../WizardButtons";

class RobotSystemStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    if (typeof this.state.runnerOptions === 'undefined') {
      this.state.runnerOptions = ""
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)

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

  render() {
    return (
        <>
          <form onChange={this.onChange}>
            <div className="form-group">
              <label htmlFor="runnerOptionsInput">Robot Parameters</label>
              <input type="text" className="form-control"
                     id="runnerOptionsInput" aria-describedby="nameHelp"
                     value={this.state.runnerOptions}/>
              <small id="nameHelp" className="form-text text-muted">
                Enter parameters for robot task. Do not enter report directory or report file configuration - this is done by Kabassu
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

export default RobotSystemStep