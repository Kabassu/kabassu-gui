import "../../styles/styles.scss"

class HistoryTable extends React.Component {

  render() {
    var list;
    if (this.props.items) {
      list = this.props.items.map(item =>
          <tr key={item.date}>
            <td>{(new Date(item.date)).toString()}</td>
            <td>{item.event}</td>
          </tr>
      );
    } else {
      list = []
    }
    return <>
      <div className="card collapsed-card">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fa fa-television"/>&nbsp;History
          </h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool"
                    data-widget="collapse"
                    data-toggle="tooltip" title="Collapse">
              <i className="fa fa-minus"/>
            </button>
          </div>
        </div>
        <div className="card-body scroll">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Event</th>
            </tr>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right text-muted">
        </div>
      </div>
    </>
  }
}

export default HistoryTable