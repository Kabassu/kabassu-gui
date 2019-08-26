import "../../styles/styles.scss"
import Button from "react-bootstrap/Button";
import DefinitionDetailsModal from "./DefinitionDetailsModal";
import Link from "next/link";

class ResultsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeDefinitionModal: false,
      definitionId: null,

    }
    this.clickDefinitionHandler = this.clickDefinitionHandler.bind(this);
    this.hideDefinitionModal = this.hideDefinitionModal.bind(this);
  }

  clickDefinitionHandler(definitionId, index, e) {
    this.setState({
      activeDefinitionModal: true,
      definitionId: definitionId
    })
  }

  hideDefinitionModal() {
    this.setState({
      activeDefinitionModal: false,
      definitionId: null
    })
  }

  calculateResult(result) {
    if (result === "Success") {
      return "table-success"
    }
    if (result === "Failure") {
      return "table-danger"
    }
    return "";
  }

  prepareReports(reports) {
    return reports.filter(item => item.type!=='single').map((item,key) =>
        <li key={key}>
          <Link href={"/report?data=" + item.downloadPath}><a
              className="nav-link">Show {item.downloadPath}</a></Link>
        </li>
    );
  }

  render() {
    let list = this.props.items.map((item, index) =>
        <tr className={this.calculateResult(item.result)} key={item._id}>
          <td>{item._id}</td>
          <td>
            <Button variant="link" key={item.definition._id}
                    onClick={e => this.clickDefinitionHandler(
                        item.definition._id,
                        index)}>{item.definition._id}</Button>
          </td>
          <td>{item.result}</td>
          <td>
            <ul className="list-unstyled">
            {this.prepareReports(item.downloadedReports)}
            </ul>
          </td>
        </tr>
    );
    return <>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>id</th>
          <th>definition</th>
          <th>Result</th>
          <th>Report</th>
        </tr>
        </thead>
        <tbody>
        {list}
        </tbody>
      </table>
      <DefinitionDetailsModal
          show={this.state.activeDefinitionModal}
          onHide={this.hideDefinitionModal}
          definitionId={this.state.definitionId}/>
    </>
  }
}

export default ResultsTable