import WizardButtons from "./WizardButtons";

class EndStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.previousStep = this.previousStep.bind(this)

  }

  previousStep() {
    this.props.previousStep()
  }

  render() {
    return (
        <WizardButtons
                       previousStep={this.previousStep}
                       displayPrevious={this.props.displayPrevious}
                       displayNext={this.props.displayNext}/>

    );
  }
}

export default EndStep