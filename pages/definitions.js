import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import DefinitionsTable from "../components/kabassu/tables/DefinitionsTable";
import TestSuitesTable from "../components/kabassu/tables/TestSuitesTable";


export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <div className="card ">
            <div className="card-header bg-gray-dark">
              <h3 className="card-title">
                <i className="fa fa-list"/>&nbsp;Prepared definitions
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
                <DataList table={<DefinitionsTable/>}
                          collection="kabassu-definitions"
                          title="List of test definitions"/>
              </div>
              <div className="col-sm-12">
                <DataList table={<TestSuitesTable/>} collection="kabassu-suites"
                          title="List of test suites"/>
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