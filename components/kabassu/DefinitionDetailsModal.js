import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';

class DefinitionDetailsModal extends React.Component {

  constructor(props) {
    super(props);
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getdefinition/'
        + this.props.definitionId, {
      crossDomain: true,
      method: 'GET',
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.definitionId !== null && this.props.definitionId
        !== prevProps.definitionId) {
      this.fetchData()
    }
  }

  render() {
    let modal;
    if (this.props.definitionId !== null && this.state !== null
        && this.state.isLoaded) {
      modal = <Modal show={this.props.show}
                     onHide={this.props.onHide}
                     size="lg"
                     aria-labelledby="contained-modal-title-vcenter"
                     centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="alert alert-dark" role="alert">
              Definition {this.state.result.name}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <table className="table table-hover table-bordered">
            <tbody>
            <tr>
              <td>Id</td>
              <td>
                {this.state.result._id}
              </td>
            </tr>
            <tr>
              <td>Runner</td>
              <td>
                {this.state.result.runner}
              </td>
            </tr>
            <tr>
              <td>Runner Options</td>
              <td>{typeof this.state.result.runnerOptions!=='undefined' ? this.state.result.runnerOptions.map((item,key) => <div key={key}>{item}</div>) : ''}</td>
            </tr>
            <tr>
              <td>Location Type</td>
              <td>
                {this.state.result.locationType}
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>
                {this.state.result.location}
              </td>
            </tr>
            <tr>
              <td>Reports</td>
              <td>
                { typeof this.state.result.reports!=='undefined' ? this.state.result.reports.map((item,key) => <div key={key}>{item}</div>) : ''}
              </td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    } else {
      modal = <div/>
    }
    return modal
  }

}

export default DefinitionDetailsModal