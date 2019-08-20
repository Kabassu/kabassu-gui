import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';

class DefinitionDetailsModal extends React.Component {

  render() {
    return (<Modal show={this.props.show}
                   onHide={this.props.onHide}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
      <Modal.Header closeButton>
        <Modal.Title>Definition details {this.props.definitionId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>TO DO: DETAILS</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>);
  }

}

export default DefinitionDetailsModal