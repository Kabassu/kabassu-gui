import "../../../styles/styles.scss"
import Link from "next/link";

class SuiteRunTable extends React.Component {

  render() {
    let list = this.props.items.map(item =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.suiteId}</td>
          <td>{typeof item.requests!=='undefined' ? item.requests.map((item,key) => <div key={key}>{item}</div>) : ''}</td>
          <td><Link href={"/suiterun?id="+ item._id}><a className="nav-link">Show
            Details</a></Link></td>
        </tr>
    );
    return   <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>Test suite definition</th>
        <th>Test requests</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }
}

export default SuiteRunTable