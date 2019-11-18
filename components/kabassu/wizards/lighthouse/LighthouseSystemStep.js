import WizardButtons from "../WizardButtons";

class LighthouseSystemStep extends React.Component {

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
    if (e.target.id === 'urlInput') {
      this.setState({url: e.target.value});
    }
  }

  showWarning() {
    if (this.state.showWarning) {
      return <div className="alert alert-danger" role="alert">
        Please fill url
      </div>
    }
  }

  validation() {
    return (typeof this.state.url !== 'undefined' && this.state.server !== '')
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
              <label htmlFor="serverInput">Page Url</label>
              <input type="text" className="form-control"
                     id="urlInput" aria-describedby="nameHelp"
                     value={this.state.url}/>
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

export default LighthouseSystemStep