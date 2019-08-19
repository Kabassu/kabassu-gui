import "../../styles/styles.scss"

class Requests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 0,
      pageSize: 10
    };
  }

  componentDidMount() {
    fetch(process.env.kabassuServer+'/kabassu/getall/kabassu-requests/'+this.state.page+'/'+this.state.pageSize, {
      crossDomain:true,
      method: 'GET',
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    let cardEntry;
    if (error) {
      cardEntry = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      cardEntry = <div>Loading...</div>;
    } else {
      cardEntry =         <ul>
        {items.map(item => (
            <li>{item._id} {item.definitionId} {item.jvm}
            </li>
        ))}
      </ul>;
    }

    return <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fa fa-text-width"/>&nbsp;List of created test definitions
        </h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
            <i className="fa fa-minus"/>
          </button>
        </div>
      </div>
      <div className="card-body scroll">
        {cardEntry}
      </div>
      <div className="card-footer text-right text-muted">
        <small>Card Footer</small>
      </div>
    </div>

  }
}

export default Definitions