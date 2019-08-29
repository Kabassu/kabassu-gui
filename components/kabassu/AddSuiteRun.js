import DataListFiltered from "./DataListFiltered";
import DefinitionsTable from "./DefinitionsTable";

const initialstate = {
  suiteId: '',
  definitionsData: new Map(),
  suiteData: {},
  filters: []
}

class AddSuiteRun extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.state.suiteId = this.props.id;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.prepareDefinitions = this.prepareDefinitions.bind(this);
    this.prepareTestsConfiguration = this.prepareTestsConfiguration.bind(this);

  };

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getsuite/'
        + this.props.id, {
      crossDomain: true,
      method: 'GET',
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            suiteData: result,
            definitionsData: this.prepareDefinitionsData(result)
          });
          this.prepareDefinitions();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    )
  }

  componentDidMount() {
    this.fetchData();
  }

  prepareDefinitions() {
    this.setState({
      filters: [
        {
          filterName: "_id",
          filterValues: typeof this.state.suiteData.definitions !== 'undefined'
              ? this.state.suiteData.definitions.map(item => item) : []
        }
      ]
    })
  }

  prepareDefinitionsData(suiteData) {
    var definitionsMap = new Map();
    suiteData.definitions.forEach(
        item => definitionsMap.set(item, {configurationId: '', jvm: ''}))
    return definitionsMap;
  }

  onChange(e) {
    if (e.target.id.startsWith('configurationInput@')) {
      var setJvm = this.state.definitionsData.get(e.target.id.split('@')[1]).jvm
      this.state.definitionsData.set(e.target.id.split('@')[1],{
        jvm: setJvm,
        configurationId: e.target.value
      })
      this.setState({definitionsData:  this.state.definitionsData});
    } else if (e.target.id.startsWith('jvmInput@')) {
      var setConfigurationId = this.state.definitionsData.get(e.target.id.split('@')[1]).configurationId
      this.state.definitionsData.set(e.target.id.split('@')[1],{
        jvm: e.target.value,
        configurationId: setConfigurationId
      })
      this.setState({definitionsData:  this.state.definitionsData});
    }
  }

  validate(state) {
    var valid = true;
    state.definitionsData.forEach(function(value,key){
      if(value.configurationId === null || value.jvm === null || value.configurationId === '' || value.jvm === '') valid = false;
    })
    return valid
  }

  transformDefinitionsData(definitionsData){
    var data = [];
    Array.from( definitionsData.keys() ).map(item =>{
    data.push(
      {
        definitionId: item,
        configurationId: definitionsData.get(item).configurationId,
        jvm: definitionsData.get(item).jvm,
      })});
    return data;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/suite/run", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          suiteId: this.state.suiteId,
         definitionsData: this.transformDefinitionsData(this.state.definitionsData)
        })
      });

      this.setState({
        definitionsData: this.prepareDefinitionsData(this.state.suiteData),
        message: <div className="alert alert-success" role="alert">
          Suite send
        </div>
      });
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong request
        </div>
      });
    }

  }

  prepareTestsConfiguration() {
    var tablecontents;
    if (typeof this.state.suiteData.definitions !== 'undefined') {
      tablecontents = this.state.suiteData.definitions.map((item, key) =>
        <tr key={key}>
          <td>{item}</td>
          <td><input type="text" className="form-control"
                     id={"configurationInput@"+item}
                     placeholder="Enter configurationId" value={this.state.definitionsData.get(item).configurationId}/></td>
          <td><input type="text" className="form-control"
                     id={"jvmInput@"+item}
                     placeholder="Enter Jvm" value={this.state.definitionsData.get(item).jvm}/></td>
        </tr>
      );
    }
    return tablecontents
  }

  render() {
    var body;
    if (this.props.id === '') {
      body =
          <div className="col-sm-12">
            <div className="card bg-danger">
              <div className="card-header">
                <h3 className="card-title">Error</h3>
              </div>
              <div className="card-body">
                Missing suite id parameter in query
              </div>
            </div>
          </div>
    } else {
      body = <>
        {this.state.message}
        <div className="row">
          <div className="col-sm-12">
            <DataListFiltered table={<DefinitionsTable/>}
                              collection="kabassu-definitions"
                              filters={this.state.filters}
                              title="List of definitions"/>
          </div>
        </div>
        <form onChange={this.onChange} onSubmit={this.onSubmit}>
          <label>Definitions Configuration</label>
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
            <tr>
              <th>Definition Id</th>
              <th>Configuration Id</th>
              <th>JVM</th>
            </tr>
            </thead>
            <tbody>{this.prepareTestsConfiguration()}</tbody>
          </table>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>
    }
    return body
  }
}

export default AddSuiteRun