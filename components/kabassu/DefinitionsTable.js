import "../../styles/styles.scss"
import Link from "next/link";

class DefinitionsTable extends React.Component {

  render() {
    var list;
    if (typeof this.props.items !== 'undefined') {
      list = this.props.items.map(item =>
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.runner}</td>
            <td>{typeof item.runnerOptions !== 'undefined'
                ? item.runnerOptions.map(
                    (item, key) => <div key={key}>{item}</div>) : ''}</td>
            <td>{item.locationType}</td>
            <td>{item.location}</td>
            <td>{typeof item.reports !== 'undefined' ? item.reports.map(
                (item, key) => <div key={key}>{item}</div>) : ''}</td>
            <td>
              <div><Link href={'/definition?id=' + item._id}><a
                  className="nav-link">Show
                Details</a></Link></div>
              <div><Link href={'/addtestrequest?id=' + item._id}><a
                  className="nav-link">Create Execution</a></Link></div>
            </td>
          </tr>
      );
    }

    return <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>runner</th>
        <th>runner options</th>
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