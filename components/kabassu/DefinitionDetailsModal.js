import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';

class DefinitionDetailsModal extends React.Component {

  constructor(props) {
    super(props);
  }


  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getdefinition/'+this.props.definitionId, {
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

  componentDidUpdate(prevProps){
    if (this.props.definitionId!== null && this.props.definitionId !== prevProps.definitionId) {
      this.fetchData()
    }
  }

  render() {
    let modal;
    if (this.props.definitionId !== null && this.state!==null && this.state.isLoaded) {
      console.log(this.state)
      modal = <Modal show={this.props.show}
                         onHide={this.props.onHide}
                         size="lg"
                         aria-labelledby="contained-modal-title-vcenter"
                         centered>
        <Modal.Header closeButton>
          <Modal.Title>Definition
            details {this.state.result.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.result.name}</div>
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