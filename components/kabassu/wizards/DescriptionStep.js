import WizardButtons from "./WizardButtons";

class DescriptionStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validation = this.validation.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  validation() {
    return (typeof this.state.description !== 'undefined' && this.state.description !== '') &&
        (typeof this.state.name !== 'undefined' && this.state.name !== '');
  }

  onChange(e) {
    if (e.target.id === 'nameInput') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'descriptionInput') {
      this.setState({description: e.target.value});
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
        Please fill all fields
      </div>
    }
  }

  render() {
    return (
        <>
          <form onChange={this.onChange}>
            {this.showWarning()}
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control"
                     id="nameInput" aria-describedby="nameHelp"
                     placeholder="Enter Name" value={this.state.name}/>
              <small id="nameHelp" className="form-text text-muted">
                Enter name
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control"
                        rows="4" value={this.state.description}></textarea>
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

export default DescriptionStep