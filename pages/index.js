import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import DataList from "../components/kabassu/DataList";
import RequestsTable from "../components/kabassu/RequestsTable";
import DefinitionsTable from "../components/kabassu/DefinitionsTable";

export default class Index extends React.Component {

  render() {
    return <AdminLayoutHoc contentTitle={'Home'} contentTitleButton={<i className="fa fa-2x fa-home"/>} url={this.props.url}>
      <div className="row">
        <div className="col-sm-12">
          <DataList table={<DefinitionsTable/>} collection="kabassu-definitions" title="List of test definitions"/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <DataList table={<RequestsTable/>} collection="kabassu-requests" title="List of test requests"/>
        </div>
      </div>


      <div className="row">
        <div className="col-sm-12">
          <div className="card card-default color-palette-box">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa fa-tag"/>&nbsp;Color Palette
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Primary</h4>

                  <div className="color-palette-set">
                    <div className="bg-primary disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-primary color-palette"><span>#3c8dbc</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Info</h4>

                  <div className="color-palette-set">
                    <div className="bg-info disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-info color-palette"><span>#00c0ef</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Success</h4>

                  <div className="color-palette-set">
                    <div className="bg-success disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-success color-palette"><span>#00a65a</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Warning</h4>

                  <div className="color-palette-set">
                    <div className="bg-warning disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-warning color-palette"><span>#f39c12</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Danger</h4>

                  <div className="color-palette-set">
                    <div className="bg-danger disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-danger color-palette"><span>#f56954</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-1">
                  <h4 className="text-center">Gray</h4>

                  <div className="color-palette-set">
                    <div className="bg-gray disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-gray color-palette"><span>#d2d6de</span></div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-1">
                  <h4 className="text-center">Black</h4>

                  <div className="color-palette-set">
                    <div className="bg-black disabled color-palette"><span>Disabled</span></div>
                    <div className="bg-black color-palette"><span>#111111</span></div>
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