import WizardButtons from "./WizardButtons";

class EndStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.previousStep = this.previousStep.bind(this)
    this.submit = this.submit.bind(this)
  }

  previousStep() {
    this.props.previousStep()
  }

  submit() {
    fetch(process.env.kabassuServer + "/kabassu/adddefinition", {
      method: 'POST',
      crossDomain: true,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ process.env.token,
      },
      body: JSON.stringify(this.generateDefinition())
    })
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
        }
    )
  }

  generateDefinition() {
    var request = {
      name: this.state.name,
      runner: 'gradle',
      locationType: this.state.locationType.value,
      additionalParameters: {},
      reports: this.state.reports.map(report => report.value)
    }
    if(request.locationType==='git'){
      request.additionalParameters['repository'] = this.state.locationInput
    }
    if(request.locationType==='filesystem'){
      request.additionalParameters['location'] = this.state.locationInput
    }
    request.additionalParameters['runnerOptions'] = this.state.runnerOptions
    if(this.state.reports.filter(report => report.value === 'generic').length>0){
      if(this.state.startHtml !=='' && typeof this.state.startHtml !== 'undefined') {
        request.additionalParameters['startHtml'] = this.state.startHtml
      }
      if(this.state.reportDir !=='' && typeof this.state.reportDir !== 'undefined') {
        request.additionalParameters['reportDir'] = this.state.reportDir
      }
    }
    console.log(request)
    return request
  }

  render() {
    return (
        <WizardButtons
            previousStep={this.previousStep}
            displayPrevious={this.props.displayPrevious}
            displayNext={this.props.displayNext}
            displaySubmit={true}
            submit={this.submit}/>

    );
  }
}

export default EndStep