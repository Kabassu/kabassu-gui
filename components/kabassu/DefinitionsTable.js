import "../../styles/styles.scss"

class DefinitionsTable extends React.Component {

  render() {
    let list = this.props.items.map(item =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.runner}</td>
          <td>{item.locationType}</td>
          <td>{item.location}</td>
          <td>LINK</td>
        </tr>
    );
    return <table className="table">
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>runner</th>
        <th>location type</th>
        <th>locations</th>
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