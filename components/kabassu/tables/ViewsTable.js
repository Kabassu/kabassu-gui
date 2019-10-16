import "../../../styles/styles.scss"
import Link from "next/link";
import AdditionalParameters from "../AdditionalParameters";

class ViewsTable extends React.Component {

  render() {
    var list;
    if (typeof this.props.items !== 'undefined') {
      list = this.props.items.map(item =>
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <div><Link href={'/view?id=' + item._id}><a
                  className="nav-link">Go to view</a></Link></div>
            </td>
          </tr>
      );
    }

    return <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>description</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }
}

export default ViewsTable