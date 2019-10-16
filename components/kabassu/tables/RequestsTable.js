import "../../../styles/styles.scss"
import Button from "react-bootstrap/Button";
import DefinitionDetailsModal from "../DefinitionDetailsModal";
import Link from "next/link";
import AdditionalParameters from "../AdditionalParameters";

class RequestsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      definitionId: null,

    }
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.renderRemove = this.renderRemove.bind(this)
    this.removeHandler = this.removeHandler.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  }

  removeHandler(id, e) {
    fetch(process.env.kabassuServer + "/kabassu/updateview", {
      method: 'POST',
      crossDomain: true,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.token,
      },
      body: JSON.stringify(this.generateRequest(id))
    });
    this.props.refresh(id)
  }

  generateRequest(id) {
    var request = {
      id: this.props.viewId,
      operation: 'remove',
      field: 'executionId',
      value: id
    }
    return request
  }

  renderRemove(id) {
    return <td><div><Button className={"btn  btn-danger btn-sm"}  onClick={e => this.removeHandler(id)}>Remove from view</Button></div></td>;
  }

  renderRemoveHeader() {
    return <th></th>;
  }

  clickHandler(definitionId, e) {
    this.setState({
      activeModal: true,
      definitionId: definitionId
    })
  }

  hideModal() {
    this.setState({
      activeModal: false,
      definitionId: null
    })
  }

  render() {
    let list = this.props.items.map((item, index) =>
        <tr key={index}>
          <td>{item.description}</td>
          <td>
            <Button variant="link" key={item.definitionId}
                    onClick={e => this.clickHandler(
                        item.definitionId)}>{item.definitionId}</Button>
          </td>
          <td><AdditionalParameters configurationId={item.configurationId} additionalParameters={item.additionalParameters}/></td>
          <td>{item.status}</td>
          <td>
            <Link href={'/request?id=' + item._id}><a className="nav-link">Show
              Details</a></Link>
          </td>
          {typeof this.props.viewId!=='undefined' ? this.renderRemove(item._id): ''}
        </tr>
    );
    return <>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
        <tr>
          <th>Description</th>
          <th>definition</th>
          <th>configuration</th>
          <th>status</th>
          <th></th>
          {typeof this.props.viewId!=='undefined' ? this.renderRemoveHeader(): ''}
        </tr>
        </thead>
        <tbody>
        {list}
        </tbody>
      </table>
      <DefinitionDetailsModal show={this.state.activeModal}
                              onHide={this.hideModal}
                              definitionId={this.state.definitionId}/>
    </>
  }
}

export default RequestsTable