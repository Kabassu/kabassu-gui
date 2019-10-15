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

                <div className="col-sm-12">
                  <div className="card ">
                    <div className="card-header bg-gray-dark">
                      <h3 className="card-title">
                        <i className="fa fa-list"/>&nbsp;Wizards - Easy Creation
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
                      <div className="row">

                        <div className="col-sm-4">
                          <div className="description-block">
                            <Link href="/wizards/wizardgradle">
                              <a className={"btn btn-lg btn-success btn-block"}>
                                <p>Gradle Wizard</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="description-block">
                            <Link href="/wizards/wizardrobot">
                              <a className={"btn btn-lg btn-success btn-block"}>
                                <p>Robot Wizard</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="description-block">
                            <Link href="/wizards/wizardaet">
                              <a className={"btn btn-lg btn-success btn-block"}>
                                <p>AET Wizard</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-right text-muted">
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="card ">
                    <div className="card-header bg-gray-dark">
                      <h3 className="card-title">
                        <i className="fa fa-list"/>&nbsp;View
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
                      <div className="row">

                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/views">
                              <a className={"btn btn-lg btn-info btn-block"}>
                                <p>Views</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/definitions">
                              <a className={"btn btn-lg btn-warning btn-block"}>
                                <p>Definitions</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/executions">
                              <a className={"btn btn-lg btn-success btn-block"}>
                                <p>Executions</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/configurations">
                              <a className={"btn btn-lg btn-secondary btn-block"}>
                                <p>Configurations</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-right text-muted">
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="card ">
                    <div className="card-header bg-gray-dark">
                      <h3 className="card-title">
                        <i className="fa fa-list"/>&nbsp;Create
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
                      <div className="row">

                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/addtestrequest">
                              <a className={"btn btn-lg btn-info btn-block"}>
                                <p>Create Request</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/addtestdefinition">
                              <a className={"btn btn-lg btn-info btn-block"}>
                                <p>Create Test Definition</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/addtestsuite">
                              <a className={"btn btn-lg btn-info btn-block"}>
                                <p>Create Test Suite</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="description-block">
                            <Link href="/addconfiguration">
                              <a className={"btn btn-lg btn-info btn-block"}>
                                <p>Create Configuration</p>
                              </a>
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card-footer text-right text-muted">
                    </div>
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