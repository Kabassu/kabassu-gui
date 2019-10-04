import Button from "react-bootstrap/Button";

class WizardButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  nextOrSubmit(){
    if(this.props.displayNext){
      return <Button className={"btn  btn-primary btn-block"}  onClick = {this.props.nextStep}>Next Step</Button>
    }
    if(this.props.displaySubmit){
      return <Button className={"btn  btn-success btn-block"}  onClick = {this.props.submit}>Submit</Button>
    }
  }

  render() {
    return (
        <div className="card-body scroll">
          <div className="row">

            <div className="col-sm-3">
              <div className="description-block">
                <Button className={"btn  btn-primary btn-block" + (this.props.displayPrevious? "" : " invisible")} onClick = {this.props.previousStep}>Previous Step</Button>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="description-block">
              </div>
            </div>
            <div className="col-sm-3">
              <div className="description-block">
                {this.nextOrSubmit()}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default WizardButtons