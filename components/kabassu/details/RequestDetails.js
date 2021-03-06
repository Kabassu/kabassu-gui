import AdditionalParameters from "../AdditionalParameters";

class RequestDetails extends React.Component {

  constructor(props) {
    super(props)
  };

  render() {
    return <>
      <div className="col-sm-6">
        <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa fa-star-o"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">ID</span>
            <span className="info-box-number">{this.props.result._id}</span>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Status</span>
            <span className="info-box-number">{this.props.result.status}</span>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Configuration</span>
            <span className="info-box-number"><AdditionalParameters configurationId={this.props.result.configurationId} additionalParameters={this.props.result.additionalParameters}/>
</span>
          </div>
        </div>
      </div>
    </>
  }
}

export default RequestDetails