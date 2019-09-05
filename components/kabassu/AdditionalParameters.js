class AdditionalParameters extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      configurationParameters: ''
    }
  };

  fetchData() {
    fetch(process.env.kabassuServer + '/kabassu/getconfiguration/'
        + this.props.configurationId, {
      method: 'GET',
      crossDomain: true,
      mode: 'cors',
    })
    .then(res => res.json())
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            configurationParameters: result,
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

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.configurationId !== prevProps.configurationId
        || this.props.additionalParameters !== prevProps.additionalParameters) {
      this.fetchData();
    }
  }

  render() {
    var configurationParameters;
    var additionalParameters = <pre>{JSON.stringify(this.props.additionalParameters, undefined, 1)}</pre>;
    if (typeof this.state.configurationParameters.parameters !== 'undefined') {
      configurationParameters = <>
        <div>Configuration</div>
        <pre>{JSON.stringify(this.state.configurationParameters.parameters,
            undefined,
            1)}</pre>
        <div>Parameters</div>
      </>
    }

    return <div>
      {configurationParameters}
      {additionalParameters}

    </div>
  }
}

export default AdditionalParameters