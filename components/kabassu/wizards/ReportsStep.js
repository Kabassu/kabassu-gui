import WizardButtons from "./WizardButtons";
import {reportTypes} from "../../data/data";
import CreatableSelect from "react-select/creatable";

class ReportsStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.existingState;
    this.state.showWarning = false;
    if (typeof this.state.reports === 'undefined') {
      this.state.reports = []
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onReportChange = this.onReportChange.bind(this)

  }

  onReportChange(value, action) {
    if (action.action === 'select-option' || action.action
        === 'remove-value') {
      if(value == null){
        value = []
      }
      this.setState(
          {reports: value});
    }
    if (action.action === 'clear') {
      this.setState(
          {reports: []});
    }
  }

  onChange(e) {
    if (e.target.id === 'startHtmlInput') {
      this.setState({startHtml: e.target.value});
    } else if (e.target.id === 'reportDirInput') {
      this.setState({reportDir: e.target.value});
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


  genericOptions() {
    let reports;
    if(this.state.reports.filter(report => report.value === 'allure-junit-xml').length>0){
     reports = <div className="form-group">
        <label htmlFor="reportDirInput">Directory for junit report xml files</label>
        <input type="text" className="form-control"
               id="reportDirInput" aria-describedby="nameHelp"
               value={this.state.reportDir}/>
        <small id="nameHelp" className="form-text text-muted">
          Enter where we can found junit xml report files
        </small>
      </div>
    }
    if(this.state.reports.filter(report => report.value === 'generic').length>0){
      reports = <>
        <div className="form-group">
          <label htmlFor="reportDirInput">Directory for generic report</label>
          <input type="text" className="form-control"
                 id="reportDirInput" aria-describedby="nameHelp"
                 value={this.state.reportDir}/>
          <small id="nameHelp" className="form-text text-muted">
            Enter where we can found generic report files
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="startHtmlInput">Start file for report</label>
          <input type="text" className="form-control"
                 id="startHtmlInput" aria-describedby="nameHelp"
                 value={this.state.startHtml}/>
          <small id="nameHelp" className="form-text text-muted">
            Enter main file for generic report
          </small>
        </div>
      </>
    }
    return reports
  }

  render() {
    return (
        <>
          <form onChange={this.onChange}>
            <div className="form-group">
              <label htmlFor="reportsInput">Reports</label>
              <CreatableSelect
                  onChange={this.onReportChange}
                  onInputChange={this.onReportChange}
                  options={reportTypes}
                  value = {this.state.reports}
                  isMulti
              />
              <small id="reportsHelp" className="form-text text-muted">
                Enter reports to use
              </small>
            </div>
            {this.genericOptions()}
            <WizardButtons nextStep={this.nextStep}
                           previousStep={this.previousStep}
                           displayPrevious={this.props.displayPrevious}
                           displayNext={this.props.displayNext}/>
          </form>
        </>
    );
  }
}

export default ReportsStep