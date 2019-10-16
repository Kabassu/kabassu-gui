import WizardButtons from "./WizardButtons";
import Link from "next/link";

class AfterStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.previousStep = this.previousStep.bind(this)
    this.generateSummary = this.generateSummary.bind(this)

  }

  previousStep() {
    this.props.previousStep()
  }

  generateSummary() {
    if(this.state.wizardState === 1000){
      return <div className="alert alert-success" role="alert">
        <div>Test was created and run with id: {this.state.requestId}. Here is the link to execution</div>
        <div>
          <Link href={'/request?id=' + this.state.requestId}>
            <a className={"btn btn-lg btn-secondary btn-block"}>
              <p>Running Execution</p>
            </a>
          </Link>
        </div>
      </div>
    } else {
      return <div className="alert alert-danger" role="alert">
        There was an error during operation
      </div>
    }
  }

  render() {
    return (
        <>
          {this.generateSummary()}
        </>
    );
  }

}

export default AfterStep