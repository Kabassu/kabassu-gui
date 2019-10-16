import WizardButtons from "./WizardButtons";

class ViewStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)

  }

  onChange(e) {
    if (e.target.id === 'viewInput') {
      this.setState({viewId: e.target.value});
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
          <div className="alert alert-warning" role="alert">View Id is optional. Use it to add execution to selected view</div>
          <form onChange={this.onChange}>
            <div className="form-group">
              <label htmlFor="viewInput">View</label>
              <input type="text" className="form-control"
                     id="viewInput" aria-describedby="nameHelp"
                     value={this.state.viewId}/>
              <small id="nameHelp" className="form-text text-muted">
                Optional view id
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

export default ViewStep