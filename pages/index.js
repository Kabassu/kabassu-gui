import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import Link from "next/link";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <div className="card ">
            <div className="card-header bg-gray-dark">

            </div>
            <div className="card-body scroll">
              <div>Welcome to Kabassu</div>
              <Link href="/executions">
                <a>
                  <p>Executions</p>
                </a>
              </Link>
              <Link href="/definitions">
                <a>
                  <p>Definitions</p>
                </a>
              </Link>
            </div>
            <div className="card-footer text-right text-muted">
            </div>
          </div>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}