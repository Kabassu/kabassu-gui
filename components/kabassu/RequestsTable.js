import "../../styles/styles.scss"
import Button from "react-bootstrap/Button";
import DefinitionDetailsModal from "./DefinitionDetailsModal";
import Link from "next/link";

class RequestsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      definitionId: null,

    }
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>
            <Button variant="link" key={item.definitionId}
                    onClick={e => this.clickHandler(
                        item.definitionId)}>{item.definitionId}</Button>
          </td>
          <td>{item.configurationId}</td>
          <td>{item.jvm}</td>
          <td>
            <Link href={'/request?id=' + item.definitionId}
                  as={'/request/' + item.definitionId}><a className="nav-link">Show
              Details</a></Link>
          </td>
        </tr>
    );
    return <>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>id</th>
          <th>definition</th>
          <th>configuration</th>
          <th>jvm</th>
          <th></th>
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