import "../../../styles/styles.scss"
import Link from "next/link";
import Button from "react-bootstrap/Button";

class SuiteRunTable extends React.Component {

  constructor(props) {
    super(props);
    this.renderRemove = this.renderRemove.bind(this)
    this.clickHandler = this.clickHandler.bind(this);
    this.generateRequest = this.generateRequest.bind(this);
  }

  clickHandler(id, e) {
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
      field: 'suiteRunId',
      value: id
    }
    return request
  }

  renderRemove(id) {
    return <td>
      <div><Button className={"btn  btn-danger btn-sm"}
                   onClick={e => this.clickHandler(id)}>Remove from
        view</Button></div>
    </td>;
  }

  renderRemoveHeader() {
    return <th></th>;
  }

  render() {
    let list = this.props.items.map(item =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.suiteId}</td>
          <td>{typeof item.requests !== 'undefined' ? item.requests.map(
              (item, key) => <div key={key}>{item}</div>) : ''}</td>
          <td>
            <div><Link href={"/suiterun?id=" + item._id}><a
                className="nav-link">Show
              Details</a></Link></div>

          </td>
          {typeof this.props.viewId !== 'undefined' ? this.renderRemove(
              item._id) : ''}
        </tr>
    );
    return <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>Test suite definition</th>
        <th>Test requests</th>
        <th></th>
        {typeof this.props.viewId !== 'undefined' ? this.renderRemoveHeader()
            : ''}
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }

}

export default SuiteRunTable