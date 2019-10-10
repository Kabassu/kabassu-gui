import WizardButtons from "../WizardButtons";

class AETSystemStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  onChange(e) {
    if (e.target.id === 'serverInput') {
      this.setState({server: e.target.value});
    }
    if (e.target.id === 'portInput') {
      this.setState({port: e.target.value});
    }
    if (e.target.id === 'suiteInput') {
      this.setState({suite: e.target.value});
    }
  }

  showWarning() {
    if (this.state.showWarning) {
      return <div className="alert alert-danger" role="alert">
        Please fill server and suite fields
      </div>
    }
  }

  validation() {
    return (typeof this.state.server !== 'undefined' && this.state.server !== '') &&
        (typeof this.state.suite !== 'undefined' && this.state.suite !== '');
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

  render() {
    return (
        <>
          {this.showWarning()}
          <form onChange={this.onChange}>
            <div className="form-group">
              <label htmlFor="serverInput">AET Server IP Address</label>
              <input type="text" className="form-control"
                     id="serverInput" aria-describedby="nameHelp"
                     value={this.state.server}/>
            </div>
            <div className="form-group">
              <label htmlFor="portInput">Port</label>
              <input type="text" className="form-control"
                     id="portInput" aria-describedby="nameHelp"
                     value={this.state.port}/>
              <small id="nameHelp" className="form-text text-muted">
                Enter only if port is different then default 8181
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="suiteInput">Suite to run</label>
              <input type="text" className="form-control"
                     id="suiteInput" aria-describedby="nameHelp"
                     value={this.state.suite}/>
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

export default AETSystemStep