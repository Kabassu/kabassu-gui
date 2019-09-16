import "../../styles/styles.scss"
import Link from "next/link";

class SingleTestReports extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 0,
      pageSize: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.kabassuServer
        + '/kabassu/getallbyfield/kabassu-results/testRequest._id/'
        + this.props.testId + '/'
        + this.state.page + '/' + this.state.pageSize, {
      crossDomain: true,
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer '+ process.env.token,
      }),
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  mapReports(downloadedReports,id){
    return downloadedReports.map(
        (download,key)  =>
          <tr key={key}>
            <td>{download.reportType}</td>
            <td><Link href={"/report?data=" + download.downloadPath+"&id="+id}><a
                className="nav-link">Show Report</a></Link></td>
          </tr>
        );
  }

  render() {
    const {error, isLoaded} = this.state;
    let cardEntry = [];
    let pip = [];

    if (error) {
      cardEntry = <tr><td>{'Error:'+error.message}</td></tr>
    } else if (!isLoaded) {
      cardEntry = <tr><td>'Loading...';</td></tr>
    } else if (this.state.items.length > 0
        && typeof this.state.items[0].downloadedReports !== 'undefined') {
      cardEntry = this.mapReports(this.state.items[0].downloadedReports.filter(
          item => item.type === 'single'),this.state.items[0].testRequest._id);
    }

    return <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fa fa-television"/>&nbsp;Reports From All Runs
        </h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-widget="collapse"
                  data-toggle="tooltip" title="Collapse">
            <i className="fa fa-minus"/>
          </button>
        </div>
      </div>
      <div className="card-body scroll">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
          <tr>
            <th>Type</th>
            <th>Report Link</th>
          </tr>
          </thead>
          <tbody>
          {cardEntry}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-right text-muted">
      </div>
    </div>

  }
}

export default SingleTestReports