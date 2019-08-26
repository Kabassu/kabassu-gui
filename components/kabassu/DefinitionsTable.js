import "../../styles/styles.scss"
import Link from "next/link";

class DefinitionsTable extends React.Component {

  render() {
    let list = this.props.items.map(item =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.runner}</td>
          <td>{item.locationType}</td>
          <td>{item.location}</td>
          <td>{typeof item.reports!=='undefined' ? item.reports.map(item => <div>{item}</div>) : ''}</td>
          <td><Link href={'/definition?id=' + item._id}><a className="nav-link">Show
            Details</a></Link></td>
        </tr>
    );
    return   <table className="table table-hover table-bordered">
      <thead className="thead-dark">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>runner</th>
        <th>location type</th>
        <th>locations</th>
        <th>reports</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }
}

export default DefinitionsTable