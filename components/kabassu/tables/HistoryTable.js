import "../../../styles/styles.scss"
import PaginationBasic from "../PaginationBasic";

class HistoryTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      size: 0,
      page: 0,
      pageSize: 5
    };
    this.updateState = this.updateState.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.lastPage = this.lastPage.bind(this)

  }

  updateState(page) {
    this.setState({
      page: (page.target.text - 1) < 0 ? 0 : (page.target.text - 1)
    });
  }

  previousPage() {
    this.setState({
      page: (this.state.page - 1) < 0 ? 0 : (this.state.page - 1)
    })
  }

  nextPage() {
    this.setState({
      page: (this.state.page + 1) >= Math.ceil(
          this.state.size / this.state.pageSize) ? Math.ceil(
          this.state.size / this.state.pageSize) - 1 : (this.state.page + 1)
    })
  }

  firstPage() {
    this.setState({
      page: 0
    })
  }

  lastPage() {
    this.setState({
      page: Math.ceil(this.state.size / this.state.pageSize) - 1
    })
  }

  generatePage(items) {
    var pages = [];
    var start = this.state.page * this.state.pageSize;
    var limit = start + this.state.pageSize;
    limit = limit <= items.length ? limit : items.length;
    for (var i = start; i < limit; i++) {
      pages[i] = items[i]
    }
    return pages;
  }

  render() {
    var list = [];
    if (typeof this.props.items !== 'undefined') {
      this.state.items = this.generatePage(this.props.items);
      if (this.state.items.length > 0) {
        this.state.size = this.props.items.length;
        list = this.state.items.map(item =>
            <tr key={item.date}>
              <td>{(new Date(item.date)).toString()}</td>
              <td>{item.event}</td>
            </tr>
        );
      }
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
          <PaginationBasic active={this.state.page} size={this.state.size}
                           pageSize={this.state.pageSize}
                           updateState={this.updateState}
                           previousPage={this.previousPage}
                           nextPage={this.nextPage}
                           firstPage={this.firstPage}
                           lastPage={this.lastPage}/>
        </div>
        <div className="card-footer text-right text-muted">
        </div>
      </div>
    </>
  }
}

export default HistoryTable