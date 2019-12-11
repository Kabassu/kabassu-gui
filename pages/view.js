import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import RequestsTable from "../components/kabassu/tables/RequestsTable";
import Link from "next/link";
import DataListFiltered from "../components/kabassu/DataListFiltered";

export default class view extends React.Component {

  static async getInitialProps({req, query: {id}}) {
    return {
      id: id,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: {},
      filtersExecutions: [],
      enableRerun: false,
    };
    this.prepareExecutionsId = this.prepareExecutionsId.bind(this);
    this.refreshView = this.refreshView.bind(this);
    this.updateRerun = this.updateRerun.bind(this);
    this.rerunTest = this.rerunTest.bind(this);
  }

  generateMenu() {
    var disabled = this.state.enableRerun ? '' : 'disabled';
    return <div>
      <button type="button"
              className={"btn btn-sm bg-gradient-green " + disabled}
              onClick={this.rerunTest}>
        <i className="fa fa-repeat"></i> Run All Tests
      </button>
    </div>
  }

  rerunTest() {
    if (this.state.enableRerun) {
      this.state.enableRerun = false;
      fetch(process.env.kabassuServer + "/kabassu/view/run", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.token,
        },
        body: JSON.stringify({
          viewId: this.props.id
        })
      }).then(res => res.json())
      .then(
          (result) => {
            if (result._id !== null) {
              this.setState({
                message: <div className="alert alert-success" role="alert">
                  Rerun suit send
                </div>,
                result: result
              });
            } else {
              this.setState({
                message: <div className="alert alert-danger" role="alert">
                  Test Suite not found
                </div>
              });
            }
          },
          (error) => {
            var loginPage = "/login?server=" + process.env.kabassuServer
            window.location = loginPage
          }
      )
    }
  }

  updateRerun(finished) {
    this.setState({
      enableRerun: finished
    })
  }

  refreshView(id){
    this.fetchData();
  }


  componentDidMount() {
    this.fetchData();
  }

  prepareExecutionsId() {
    this.setState({
      filtersExecutions:  [
        {
          filterName: "_id",
          filterValues: typeof this.state.result.executionId !== 'undefined' ? this.state.result.executionId.map(item => item) : ['no data']
        }
      ]
    })
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getview/' + this.props.id,
        {
          crossDomain: true,
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer '+ process.env.token,
          }),
        })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
          this.prepareExecutionsId()
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  render() {

    return <AdminLayoutHoc contentTitle={'View Details'}
                           menu={this.generateMenu()}
                           url={this.props.url}>
      <div className="row">
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa fa-star-o"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">ID</span>
              <span className="info-box-number">{this.state.result._id}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa fa-star-o"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Name</span>
              <span className="info-box-number">{this.state.result.name}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
          <span className="info-box-icon bg-red"><i
              className="fa  fa-terminal"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Description</span>
              <span
                  className="info-box-number">{this.state.result.description}</span>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<RequestsTable viewId={this.props.id} refresh={this.refreshView}/>}
                            collection="kabassu-requests"
                            filters={this.state.filtersExecutions}
                            title="List of executions"
                            parentUpdate={this.updateRerun}/>
        </div>
      </div>

    </AdminLayoutHoc>
  }
}