import WizardButtons from "../WizardButtons";

class AETCustomStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)

  }

  onChange(e) {
    if (e.target.id === 'domainInput') {
      this.setState({domain: e.target.value});
    }
    if (e.target.id === 'patternInput') {
      this.setState({pattern: e.target.value});
    }
    if (e.target.id === 'nameInput') {
      this.setState({nameSuite: e.target.value});
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
          <div className="alert alert-warning" role="alert">Change parameters below only if you want to override suite entries</div>
          <form onChange={this.onChange}>
            <div className="form-group">
              <label htmlFor="domainInput">Custom domain</label>
              <input type="text" className="form-control"
                     id="domainInput" aria-describedby="nameHelp"
                     value={this.state.domain}/>
            </div>
            <small id="nameHelp" className="form-text text-muted">
              Change domain from suite
            </small>
            <div className="form-group">
              <label htmlFor="patternInput">Pattern</label>
              <input type="text" className="form-control"
                     id="patternInput" aria-describedby="nameHelp"
                     value={this.state.pattern}/>
              <small id="nameHelp" className="form-text text-muted">
                Change pattern from the suite
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control"
                     id="nameInput" aria-describedby="nameHelp"
                     value={this.state.nameSuite}/>
              <small id="nameHelp" className="form-text text-muted">
                Change name from the suite
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

export default AETCustomStep