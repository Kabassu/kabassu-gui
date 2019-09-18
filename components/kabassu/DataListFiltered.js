import "../../styles/styles.scss"
import PaginationBasic from "./PaginationBasic";

class DataListFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      size: 0,
      page: 0,
      pageSize: 5,
    };
    this.updateState = this.updateState.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.parentUpdate = this.parentUpdate.bind(this)
  }

  updateState(page) {
    this.state.page = (page.target.text - 1) < 0 ? 0 : (page.target.text - 1);
    this.fetchData()

  }

  previousPage() {
    this.state.page = (this.state.page - 1) < 0 ? 0 : (this.state.page - 1);
    this.fetchData()
  }

  nextPage() {
    this.state.page = (this.state.page + 1) >= Math.ceil(
        this.state.size / this.state.pageSize) ? Math.ceil(
        this.state.size / this.state.pageSize) - 1 : (this.state.page + 1);
    this.fetchData()
  }

  firstPage() {
    this.state.page = 0;
    this.fetchData()
  }

  lastPage() {
    this.state.page = Math.ceil(this.state.size / this.state.pageSize) - 1;
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData();
  }

  parentUpdate(){
    if(typeof this.props.parentUpdate !== 'undefined' && typeof this.state.items !== 'undefined'){
       this.props.parentUpdate(this.state.items.filter(item => item.status !=='finished').length===0)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.fetchData();
    }
  }

  fetchData() {
    var request = {
      collection : this.props.collection,
      page: this.state.page,
      pageSize: this.state.pageSize,
      filters: this.props.filters
    }
    fetch(process.env.kabassuServer + '/kabassu/getbyfilters', {
      method: 'POST',
      crossDomain: true,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ process.env.token,
      },
      body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
            size: result.allItems
          });
          this.parentUpdate()
        },
        (error) => {
          var loginPage = "/login?server=" + process.env.kabassuServer
          window.location = loginPage
        }
    )
  }

  render() {
    const {error, isLoaded, items, size, page, pageSize} = this.state;
    let cardEntry;
    if (error) {
      cardEntry = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      cardEntry = <div>Loading...</div>;
    } else {
      cardEntry = <div>
        {React.cloneElement(this.props.table, {items: items})}
        {Math.ceil(
            this.state.size / this.state.pageSize) > 1 &&
        <PaginationBasic active={page} size={size} pageSize={pageSize}
                         updateState={this.updateState}
                         previousPage={this.previousPage}
                         nextPage={this.nextPage}
                         firstPage={this.firstPage}
                         lastPage={this.lastPage}/>
        }
      </div>;
    }

    return <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fa fa-television"/>&nbsp;{this.props.title}
        </h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-widget="collapse"
                  data-toggle="tooltip" title="Collapse">
            <i className="fa fa-minus"/>
          </button>
        </div>
      </div>
      <div className="card-body scroll">
        {cardEntry}
      </div>
      <div className="card-footer text-right text-muted">
      </div>
    </div>

  }
}

export default DataListFiltered