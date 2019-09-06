import "../../../styles/styles.scss"

class ConfigurationsTable extends React.Component {

  render() {
    var list;
    if (typeof this.props.items !== 'undefined') {
      list = this.props.items.map(item =>
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.suggestedType}</td>
            <td><pre>{JSON.stringify(item.parameters,undefined,1)}</pre></td>
          </tr>
      );
    }

    return <table className="table table-hover table-bordered">
      <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>description</th>
        <th>suggested type</th>
        <th>parameters</th>
      </tr>
      </thead>
      <tbody>
      {list}
      </tbody>
    </table>
  }
}

export default ConfigurationsTable