import DataListFiltered from "./DataListFiltered";
import DefinitionsTable from "./DefinitionsTable";

const initialstate = {
  suiteId: '',
  definitionsData: new Map(),
  additionalParameters: new Map(),
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
    this.prepareAdditionalParameters = this.prepareAdditionalParameters.bind(
        this);
    this.prepareTestsConfiguration = this.prepareTestsConfiguration.bind(this);
    this.addParameters = this.addParameters.bind(this);
    this.removeParameters = this.removeParameters.bind(this);

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
            definitionsData: this.prepareDefinitionsData(result),
            additionalParameters: this.prepareAdditionalParameters(result)
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
        item => definitionsMap.set(item,
            {configurationId: '', additionalData: new Map()}))
    return definitionsMap;
  }

  prepareAdditionalParameters(suiteData) {
    var parametersMap = new Map();
    suiteData.definitions.forEach(
        item => parametersMap.set(item, {field: '', value: ''}))
    return parametersMap;
  }

  onChange(e) {
    if (e.target.id.startsWith('configurationInput@')) {
      var additional = this.state.definitionsData.get(
          e.target.id.split('@')[1]).additionalData
      this.state.definitionsData.set(e.target.id.split('@')[1], {
        configurationId: e.target.value,
        additionalData: additional
      })
      this.setState({definitionsData: this.state.definitionsData});
    } else if (e.target.id.startsWith('parameterValueInput@')) {
      var changedData = this.state.additionalParameters.get(
          e.target.id.split('@')[1]).field
      this.state.additionalParameters.set(e.target.id.split('@')[1], {
        value: e.target.value,
        field: changedData
      })
      this.setState({additionalParameters: this.state.additionalParameters});
    } else if (e.target.id.startsWith('parameterFieldInput@')) {
      var changedData = this.state.additionalParameters.get(
          e.target.id.split('@')[1]).value
      this.state.additionalParameters.set(e.target.id.split('@')[1], {
        field: e.target.value,
        value: changedData
      })
      this.setState({additionalParameters: this.state.additionalParameters});
    }
  }

  validate(state) {
    var valid = true;
    state.definitionsData.forEach(function (value, key) {
    })
    return valid
  }

  transformDefinitionsData(definitionsData) {
    var data = [];
    Array.from(definitionsData.keys()).map(item => {
      data.push(
          {
            definitionId: item,
            configurationId: definitionsData.get(item).configurationId,
            additionalParameters: {}
          })
      definitionsData.get(item).additionalData.forEach(function(value, key){
        data[data.length-1].additionalParameters[key] = value
      })
    });

    return data;
  }

  addParameters(e) {
    var definition = e.target.value;
    this.state.definitionsData.get(definition).additionalData.set(
        this.state.additionalParameters.get(definition).field,
        this.state.additionalParameters.get(definition).value)
    this.state.additionalParameters.set(definition, {field: '', value: ''})
    this.setState({
      definitionsData: this.state.definitionsData
    })
    console.log(this.state.definitionsData)
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
          definitionsData: this.transformDefinitionsData(
              this.state.definitionsData)
        })
      });

      this.setState({
        definitionsData: this.prepareDefinitionsData(this.state.suiteData),
        additionalParameters: this.prepareAdditionalParameters(this.state.suiteData),
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
                       id={"configurationInput@" + item}
                       placeholder="Enter configurationId"
                       value={this.state.definitionsData.get(
                           item).configurationId}/>
              {this.generateAdditionalData(item)}
            </td>
          </tr>
      );
    }
    return tablecontents
  }

  removeParameters(e) {
    if (typeof e.target.value !== 'undefined') {
      var items = e.target.value.split('@');
      this.state.definitionsData.get(items[0]).additionalData.delete(items[1]);
      this.setState({
        definitionsData: this.state.definitionsData
      })
    }
  }

  generateAdditionalData(item) {
    let addedParameters = Array.from(
        this.state.definitionsData.get(item).additionalData, ([key, value]) =>
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
              <td>
                <button type="button" className="btn-danger"
                        onClick={this.removeParameters}
                        value={item + "@" + key}><i
                    className="fa fa-remove"/></button>
              </td>
            </tr>
    );
    return <>
      <label htmlFor="definitionsInput">Additional Parameters</label>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
        <tr>
          <th>Parameter name</th>
          <th>Parameter value</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{addedParameters}</tbody>
      </table>
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control"
                 id={"parameterFieldInput@" + item} aria-describedby="nameHelp"
                 placeholder="Enter parameter name"
                 value={this.state.additionalParameters.get(item).field}/>
        </div>
        <div className="col">
          <input type="text" className="form-control"
                 id={"parameterValueInput@" + item} aria-describedby="nameHelp"
                 placeholder="Enter parameter value"
                 value={this.state.additionalParameters.get(item).value}/>
        </div>
        <div className="col">
          <button type="button" className="btn btn-info btn-flat"
                  value={item} onClick={this.addParameters}>Add parameter
          </button>
        </div>
      </div>
    </>
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