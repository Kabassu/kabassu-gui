import "../../styles/styles.scss"
import Button from "react-bootstrap/Button";
import DefinitionDetailsModal from "./DefinitionDetailsModal";

class RequestsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      definitionId: null,

    }
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  clickHandler(definitionId, index, e) {
    this.setState({
      activeModal: index,
      definitionId: definitionId
    })
  }

  hideModal() {
    this.setState({activeModal: null})
  }

  render() {
    let list = this.props.items.map((item, index) =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>
            <Button variant="link" key={item.definitionId}
                    onClick={e => this.clickHandler(item.definitionId,
                        index)}>{item.definitionId}</Button>
            <DefinitionDetailsModal show={this.state.activeModal === index}
                                    onHide={this.hideModal}
                                    definitionId={this.state.definitionId}/>
          </td>
          <td>{item.configurationId}</td>
          <td>{item.jvm}</td>
          <td>LINK</td>
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
    </>
  }
}

export default RequestsTable