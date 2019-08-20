import "../../styles/styles.scss"
import PaginationBasic from "./PaginationBasic";

class Definitions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(process.env.kabassuServer+'/kabassu/getall/kabassu-definitions/0/100', {
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
      cardEntry =  <PaginationBasic active = {1} size = {300} />;
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