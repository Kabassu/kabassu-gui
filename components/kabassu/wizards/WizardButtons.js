import Link from "next/link";
import Button from "react-bootstrap/Button";

class WizardButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="card-body scroll">
          <div className="row">

            <div className="col-sm-3">
              <div className="description-block">
                <Button className={"btn  btn-primary btn-block" + (this.props.displayPrevious? "" : " disabled")} onClick = {this.props.previousStep}>Previous Step</Button>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="description-block">
              </div>
            </div>
            <div className="col-sm-3">
              <div className="description-block">
                <Button className={"btn  btn-primary btn-block" + (this.props.displayNext? "" : " disabled")}  onClick = {this.props.nextStep}>Next Step</Button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default WizardButtons