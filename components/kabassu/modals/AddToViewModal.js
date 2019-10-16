import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';

class AddToViewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewId: '',
      message: null,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  }

  onChange(e) {
    if (e.target.id === 'viewInput') {
      this.setState({viewId: e.target.value});
    }
  }

  validate(state) {
    return state.viewId !== '';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/updateview", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ process.env.token,
        },
        body: JSON.stringify(this.generateRequest())
      });

      this.setState({
        viewId: '',
      });
      this.props.onHide()
    } else {
      this.setState({
        viewId: '',
        message: <div className="alert alert-danger" role="alert">
          Missing Id
        </div>
      });
    }

  }

  generateRequest() {
    var request = {
      id: this.state.viewId,
      operation: 'add',
      field: this.props.field,
      value: this.props.id
    }
    return request
  }

  render() {
    let modal;
    if (this.props.id !== null && this.state !== null) {
      modal = <Modal show={this.props.show}
                     onHide={this.props.onHide}
                     size="lg"
                     aria-labelledby="contained-modal-title-vcenter"
                     centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="alert alert-dark" role="alert">
              Add to View
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="viewInput">Name</label>
              <input type="text" className="form-control"
                     id="viewInput" aria-describedby="definitionIdHelp"
                     placeholder="Enter name"
                     value={this.state.viewId}/>
              <small id="definitionIdHelp" className="form-text text-muted">
                Enter view id
              </small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
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

export default AddToViewModal