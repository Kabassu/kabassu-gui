import WizardButtons from "./WizardButtons";
import Button from "react-bootstrap/Button";
import AdditionalParameters from "../AdditionalParameters";
import Link from "next/link";

class GradleDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visuals: new Map()
    }
  }


  prepareVisuals(){
    this.state.visuals = new Map();

    if(this.props.state.name !=='' && typeof this.props.state.name !== 'undefined'){
      this.state.visuals.set("Name", this.props.state.name)
    }

    if(this.props.state.description !=='' && typeof this.props.state.description !== 'undefined'){
      this.state.visuals.set("Description", this.props.state.description)
    }

    if(typeof this.props.state.locationType !== 'undefined') {
      this.state.visuals.set("Location Type",
          this.props.state.locationType.label)
      if(this.props.state.locationType.value === 'git'){
        if(this.props.state.locationInput !=='' && typeof this.props.state.locationInput !== 'undefined') {
          this.state.visuals.set("Repository", this.props.state.locationInput)
        }
        if(this.props.state.branchInput !=='' && typeof this.props.state.branchInput !== 'undefined'){
          this.state.visuals.set("Branch", this.props.state.branchInput)
        }
      }
      if(this.props.state.locationType.value === 'filesystem'){
        if(this.props.state.locationInput !=='' && typeof this.props.state.locationInput !== 'undefined') {
          this.state.visuals.set("Disk Location", this.props.state.locationInput)
        }
      }
    }

    if(typeof this.props.state.jvm !== 'undefined') {
      this.state.visuals.set("JVM",
          this.props.state.jvm.label)
    }

    if(this.props.state.runnerOptions !=='' && typeof this.props.state.runnerOptions !== 'undefined'){
      this.state.visuals.set("Running Options", this.props.state.runnerOptions)
    }

    if(this.props.state.reports !==[] && typeof this.props.state.reports !== 'undefined'){
      this.state.visuals.set("Reports", this.props.state.reports.map(item => <div>{item.label}</div>))
      if(this.props.state.reports.filter(report => report.value === 'generic').length>0){
        if(this.props.state.startHtml !=='' && typeof this.props.state.startHtml !== 'undefined') {
          this.state.visuals.set("Generic Start File", this.props.state.startHtml)
        }
        if(this.props.state.reportDir !=='' && typeof this.props.state.reportDir !== 'undefined') {
          this.state.visuals.set("Generic Report Directory", this.props.state.reportDir)
        }
      }
      if(this.props.state.reports.filter(report => (report.value === 'allure-junit-xml' || report.value === 'allure-junit-xml-trend') ).length>0){
        if(this.props.state.reportDir !=='' && typeof this.props.state.reportDir !== 'undefined') {
          this.state.visuals.set("JUnit xml files", this.props.state.reportDir)
        }
      }
    }
    if (this.props.state.viewId !== ''
        && typeof this.props.state.viewId !== 'undefined') {
      this.state.visuals.set("View", this.props.state.viewId)
    }
  }

  render() {
    this.prepareVisuals()
    let list = Array.from(this.state.visuals.keys()).map((item, index) =>
        <tr key={index}>
          <td>{item}</td>
          <td>{this.state.visuals.get(item)}</td>
        </tr>
    );
    return (
        <table className="table table-hover table-bordered">
          <thead className="thead-light">
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
    );
  }
}

export default GradleDisplay