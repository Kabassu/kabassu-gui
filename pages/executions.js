import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import RequestsTable from "../components/kabassu/RequestsTable";
import DefinitionsTable from "../components/kabassu/DefinitionsTable";
import TestSuitesTable from "../components/kabassu/TestSuitesTable";
import SuiteRunTable from "../components/kabassu/SuiteRunTable";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>

      <div className="row">
        <div className="col-sm-12">
          <div className="card ">
            <div className="card-header bg-gray-dark">
              <h3 className="card-title">
                <i className="fa fa-list"/>&nbsp;Executions
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
              <div className="col-sm-12">
                <DataList table={<RequestsTable/>} collection="kabassu-requests"
                          title="List of test executions"/>
              </div>
              <div className="col-sm-12">
                <DataList table={<SuiteRunTable/>} collection="kabassu-suite-runs"
                          title="List of test suites executions"/>
              </div>
            </div>
            <div className="card-footer text-right text-muted">
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutHoc>
  }
}