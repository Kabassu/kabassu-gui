import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import ReportFrame from "../components/kabassu/ReportFrame";

export default class Report extends React.Component {

  static async getInitialProps({req, query: {data,id}}) {
    return {
      data: data,
      id: id
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Report Details'}
                           contentTitleButton={<a href={'/request?id='+this.props.id}
                               className={"btn btn-app"}>
                             <i className="fa  fa-step-backward"></i> Return to request
                           </a>} url={this.props.url}>

      <ReportFrame src={process.env.kabassuResultsServer + "/kabassu/results"
      + this.props.data}/>

    </AdminLayoutHoc>
  }
}