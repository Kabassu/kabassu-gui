import "../../styles/styles.scss"
import Button from "react-bootstrap/Button";
import DefinitionDetailsModal from "./DefinitionDetailsModal";
import Link from "next/link";

class TestSuitesTable extends React.Component {

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

  prepareDefinitions(definitions) {
    return definitions.map((item, index) =>
        <div key={index}>
          <Button variant="link" key={item}
                  onClick={e => this.clickHandler(item)}>{item}
          </Button>
        </div>)
  }

  render() {
    let list = this.props.items.map((item, index) =>
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>
            {this.prepareDefinitions(item.definitions)}
          </td>
          <td>
            <div><Link href={"/suite?id="+ item._id}><a className="nav-link">Show
              Details</a></Link></div>
            <div><Link href={'/addsuiterun?id=' + item._id}><a
                className="nav-link">Create Execution</a></Link></div>
          </td>
        </tr>
    );
    return <>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Definitions</th>
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

export default TestSuitesTable