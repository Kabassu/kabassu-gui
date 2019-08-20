import "../../styles/styles.scss"

class RequestsTable extends React.Component {

  render() {
    let list = this.props.items.map(item =>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.definitionId}</td>
          <td>{item.configurationId}</td>
          <td>{item.jvm}</td>
          <td>LINK</td>
        </tr>
    );
    return <table className="table">
      <thead>
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
  }
}

export default RequestsTable