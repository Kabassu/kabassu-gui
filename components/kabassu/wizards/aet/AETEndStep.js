import WizardButtons from "../WizardButtons";

class AETEndStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.previousStep = this.previousStep.bind(this)
    this.submit = this.submit.bind(this)
    this.sendRequest = this.sendRequest.bind(this)

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
        'Authorization': 'Bearer ' + process.env.token,
      },
      body: JSON.stringify(this.generateDefinition())
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.sendRequest(result.id)
        },
        (error) => {
          this.props.updateState({
            wizardState: 6
          })
        }
    )
  }

  sendRequest(id) {
    fetch(process.env.kabassuServer + "/kabassu/test/run", {
      method: 'POST',
      crossDomain: true,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ process.env.token,
      },
      body: JSON.stringify(this.generateRequest(id))
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.props.updateState({
            wizardState: 5,
            requestId: result.id
          })
        },
        (error) => {
          this.props.updateState({
            wizardState: 6
          })
        }
    )
  }

  generateRequest(id) {
    var request = {
      definitionId: id,
      description: this.state.description,
      additionalParameters: {},
    }
    if (typeof this.state.domain !== 'undefined' && this.state.domain !== '') {
      request.additionalParameters['domain'] = this.state.domain
    }
    if (typeof this.state.pattern !== 'undefined' && this.state.pattern !== '') {
      request.additionalParameters['pattern'] = this.state.pattern
    }
    if (typeof this.state.nameSuite !== 'undefined' && this.state.nameSuite !== '') {
      request.additionalParameters['name'] = this.state.nameSuite
    }
    if (this.state.viewId !== ''
        && typeof this.state.viewId !== 'undefined') {
      request.viewId = this.state.viewId
    }
    return request
  }

  generateDefinition() {
    var request = {
      name: this.state.name,
      runner: 'aet',
      locationType: this.state.locationType.value,
      additionalParameters: {},
      reports: ['aet']
    }
    if (request.locationType === 'git') {
      request.additionalParameters['repository'] = this.state.locationInput
    }
    if (request.locationType === 'filesystem') {
      request.additionalParameters['location'] = this.state.locationInput
    }
    request.additionalParameters['server'] = this.state.server
    request.additionalParameters['suite'] = this.state.suite
    if (typeof this.state.port !== 'undefined' && this.state.port !== '') {
      request.additionalParameters['port'] = this.state.port
    }
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

export default AETEndStep