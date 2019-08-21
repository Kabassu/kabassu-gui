
class ReportFrame extends React.Component {

  render() {
    return (
        <div>
          <iframe src={this.props.src}/>
        </div>
    );
  }
}

export default ReportFrame