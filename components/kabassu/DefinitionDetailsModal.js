import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';

class DefinitionDetailsModal extends React.Component {

  render() {
    return ( <Modal show = {this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal! {this.props.definitionId}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>);
  }

}

export default DefinitionDetailsModal