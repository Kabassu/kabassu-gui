
class ReportFrame extends React.Component {

  render() {
    return (
        <div className="row  d-flex h-100">
          <iframe src={this.props.src} className="reportFrame" name = {new Date().getTime()}/>
        </div>
    );
  }
}

export default ReportFrame