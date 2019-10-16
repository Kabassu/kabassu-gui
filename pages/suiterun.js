import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import HistoryTable from "../components/kabassu/tables/HistoryTable";
import RequestsTable from "../components/kabassu/tables/RequestsTable";
import DataListFiltered from "../components/kabassu/DataListFiltered";
import SuiteDetails from "../components/kabassu/details/SuiteDetails";
import AddToViewModal from "../components/kabassu/modals/AddToViewModal";

export default class SuiteRun extends React.Component {

  static async getInitialProps({req, query: {id}}) {
    return {
      id: id
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: {},
      message: null,
      enableRerun: false,
      filters: []
    };
    this.prepareRequests = this.prepareRequests.bind(this);
    this.updateRerun = this.updateRerun.bind(this);
    this.rerunTest = this.rerunTest.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({
      activeModal: true,
    })
  }

  hideModal() {
    this.setState({
      activeModal: false,
    })
  }

  generateMenu() {
    var disabled = this.state.enableRerun ? '' : 'disabled';
    this.state.enableRerun = this.state.result.status == 'finished';
    return <div>
      <button type="button"
              className={"btn btn-sm bg-gradient-green " + disabled}
              onClick={this.rerunTest}>
        <i className="fa fa-repeat"></i> Run Again
      </button>
      <button type="button"
              className={"btn btn-sm bg-gradient-info "}
              onClick={this.showModal}>
        <i className="fa fa-repeat"></i> Add to View
      </button>
    </div>
  }

  prepareRequests() {
    this.setState({
      filters: [
        {
          filterName: "_id",
          filterValues: typeof this.state.result.requests !== 'undefined'
              ? this.state.result.requests.map(item => item) : []
        }
      ],
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  updateRerun(finished) {
    this.setState({
      enableRerun: finished
    })
  }

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getsuiterun/' + this.props.id, {
      crossDomain: true,
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + process.env.token,
      }),
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
          this.prepareRequests()
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  rerunTest() {
    if (this.state.enableRerun) {
      this.state.enableRerun = false;
      fetch(process.env.kabassuServer + "/kabassu/suite/rerun", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.token,
        },
        body: JSON.stringify({
          suiterunId: this.props.id
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

  render() {
    return <AdminLayoutHoc contentTitle={'Suit Execution Details'}
                           menu={this.generateMenu()} url={this.props.url}>
      {this.state.message}
      <AddToViewModal show={this.state.activeModal}
                      onHide={this.hideModal}
                      id={this.props.id}
                      field='suiteRunId'/>
      <div className="row">
        <div className="col-sm-6">
          <div className="info-box">
            <span className="info-box-icon bg-warning"><i
                className="fa fa-copy"></i></span>
            <div className="info-box-content">
              <span className="info-box-number">Id</span>
              <div>
                {this.state.result._id}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="info-box">
            <span className="info-box-icon bg-warning"><i
                className="fa fa-copy"></i></span>
            <div className="info-box-content">
              <span className="info-box-number">Status</span>
              <div>
                {this.state.enableRerun ? 'Finished' : 'In progress'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <SuiteDetails id={this.state.result.suiteId}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <HistoryTable items={this.state.result.history}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <DataListFiltered table={<RequestsTable/>}
                            collection="kabassu-requests"
                            filters={this.state.filters}
                            title="List of test executions"
                            parentUpdate={this.updateRerun}/>
        </div>
      </div>


    </AdminLayoutHoc>
  }
}