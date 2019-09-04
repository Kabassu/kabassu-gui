import "../../styles/styles.scss"
import Link from "next/link";

class DefinitionsTable extends React.Component {

  render() {
    var list;
    if (typeof this.props.items !== 'undefined') {
      list = this.props.items.map(item =>
          <tr key={item._id}>
            <td>
              <div><Link href={'/definition?id=' + item._id}><a
                  className="nav-link">Show
                Details</a></Link></div>
              <div><Link href={'/addtestrequest?id=' + item._id}><a
                  className="nav-link">Create Execution</a></Link></div>
            </td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.runner}</td>
            <td>{item.locationType}</td>
            <td><pre>{JSON.stringify(item.additionalParameters,undefined,1)}</pre></td>
            <td><pre>{JSON.stringify(item.reports,undefined,1)}</pre></td>
          </tr>
      );
    }

    return <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th></th>
        <th>id</th>
        <th>name</th>
        <th>runner</th>
        <th>location type</th>
        <th>additional parameters</th>
        <th>reports</th>
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }
}

export default DefinitionsTable