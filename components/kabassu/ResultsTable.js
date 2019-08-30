import "../../styles/styles.scss"
import Link from "next/link";

class ResultsTable extends React.Component {

  constructor(props) {
    super(props);
  }

  calculateResult(result) {
    if (result === "Success") {
      return "table-success"
    }
    if (result === "Failure") {
      return "table-danger"
    }
    return "";
  }

  prepareReports(reports,id) {
    return reports.filter(item => item.type!=='single').map((item,key) =>
        <li key={key}>
          <Link href={"/report?data=" + item.downloadPath + "&id="+id}><a
              className="nav-link">Show Report: {item.reportType}</a></Link>
        </li>
    );
  }

  render() {
    let list = this.props.items.map((item, index) =>
        <tr className={this.calculateResult(item.result)} key={item._id}>
          <td>{item.result}</td>
          <td>
            <ul className="list-unstyled">
            {this.prepareReports(item.downloadedReports,item.testRequest._id)}
            </ul>
          </td>
        </tr>
    );
    return <>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>Result</th>
          <th>Report</th>
        </tr>
        </thead>
        <tbody>
        {list}
        </tbody>
      </table>
    </>
  }
}

export default ResultsTable