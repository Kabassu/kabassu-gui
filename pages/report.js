import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import ReportFrame from "../components/kabassu/ReportFrame";

export default class Report extends React.Component {

  static async getInitialProps({req, query: { data }}) {
    return {
      data: data
    }
  }

  render() {
    return <AdminLayoutHoc contentTitle={'Report Details'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>

      <ReportFrame src={process.env.kabassuResultsServer+"/kabassu/results"+this.props.data}/>

    </AdminLayoutHoc>
  }
}