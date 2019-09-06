import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataListParametrized from "../components/kabassu/DataListParametrized";
import ConfigurationsTable from "../components/kabassu/tables/ConfigurationsTable";

export default class Configurations extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i
        className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <div className="card ">
            <div className="card-header bg-gray-dark">
              <h3 className="card-title">
                <i className="fa fa-list"/>&nbsp;Prepared configurations
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
                <DataListParametrized table={<ConfigurationsTable/>}
                                      collection="kabassu-configurations"
                                      field="suggestedType" value="execution"
                                      title="List of execution configurations"/>
              </div>
              <div className="col-sm-12">
                <DataListParametrized table={<ConfigurationsTable/>}
                                      collection="kabassu-configurations"
                                      field="suggestedType" value="definition"
                                      title="List of definition configurations"/>
              </div>
              <div className="col-sm-12">
                <DataListParametrized table={<ConfigurationsTable/>}
                                      collection="kabassu-configurations"
                                      field="suggestedType" value="other"
                                      title="List of other configurations"/>
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