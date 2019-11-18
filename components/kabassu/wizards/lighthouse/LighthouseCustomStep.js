import WizardButtons from "../WizardButtons";
import CreatableSelect from 'react-select/creatable';
import {parametersOptions} from "../../../data/data";

class LighthouseCustomStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);
    this.onParameterNameChange = this.onParameterNameChange.bind(this);
  }

  onParameterNameChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'create-option') {
      this.setState(
          {possibleParameterName: value.value});
    }
    if (action.action === 'clear') {
      this.setState(
          {possibleParameterName: ''});
    }
  }

  addParameters(e) {
    if (this.state.possibleParameterName !== null
        && this.state.possibleParameterName !== '') {
      this.state.parameters.set(this.state.possibleParameterName,
          this.state.possibleParameterValue);
      this.setState({
        possibleParameterName: '',
        possibleParameterValue: ''
      })
    }
  }

  removeParameters(e) {
    this.state.parameters.delete(e.target.value);
    this.setState({
      parameters: this.state.parameters,
      possibleParameterName: '',
      possibleParameterValue: ''
    })

  }

  onChange(e) {
    if (e.target.id === 'possibleParameterValue') {
      this.setState({possibleParameterValue: e.target.value});
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

  generateOptions() {
    let addedParameters = Array.from(this.state.parameters, ([key, value]) =>
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
          <td>
            <button type="button" className="btn-danger"
                    onClick={this.removeParameters} value={key}><i
                className="fa fa-remove"/></button>
          </td>
        </tr>
    );
    return <div className="form-group">
      <label htmlFor="definitionsInput">Additional Parameters</label>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>Parameter name</th>
          <th>Parameter value</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{addedParameters}</tbody>
      </table>
      <div className="form-row">
        <div className="col">
          <CreatableSelect
              isClearable
              onChange={this.onParameterNameChange}
              onInputChange={this.onParameterNameChange}
              options={parametersOptions}
          />
        </div>
        <div className="col">
            <input type="text" className="form-control"
                   id="possibleParameterValue" aria-describedby="nameHelp"
                   placeholder="" value={this.state.possibleParameterValue}/>
        </div>
        <div className="col">
          <button type="button" className="btn btn-info btn-flat"
                  onClick={this.addParameters}>Add parameter
          </button>
        </div>
      </div>
    </div>

  }


  render() {
    return (
        <>
          <div className="alert alert-warning" role="alert">You can add additional Lighthouse parameters here</div>
          <form onChange={this.onChange}>
            {this.generateOptions()}
            <WizardButtons nextStep={this.nextStep}
                           previousStep={this.previousStep}
                           displayPrevious={this.props.displayPrevious}
                           displayNext={this.props.displayNext}/>
          </form>
        </>
    );
  }
}

export default LighthouseCustomStep