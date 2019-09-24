import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import Link from "next/link";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-widget widget-user">
            <div className="widget-user-header bg-info"/>
            <div className="widget-user-image">
              <img className="img-circle elevation-2"
                   src="/static/images/kabassu.png" alt="User Avatar"/>
            </div>
            <div className="card-footer">
              <div className="row">

                <div className="col-sm-4">
                  <div className="description-block">
                    <Link href="/definitions">
                      <a className={"btn btn-lg btn-warning btn-block"}>
                        <p>Definitions</p>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="description-block">
                    <Link href="/executions">
                      <a className={"btn btn-lg btn-success btn-block"}>
                        <p>Executions</p>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="description-block">
                    <Link href="/configurations">
                      <a className={"btn btn-lg btn-secondary btn-block"}>
                        <p>Configurations</p>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-4 border-right">
                  <div className="description-block">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}