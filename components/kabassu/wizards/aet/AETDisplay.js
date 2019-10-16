class AETDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visuals: new Map()
    }
  }

  prepareVisuals() {
    this.state.visuals = new Map();

    if (this.props.state.name !== '' && typeof this.props.state.name
        !== 'undefined') {
      this.state.visuals.set("Name", this.props.state.name)
    }

    if (this.props.state.description !== ''
        && typeof this.props.state.description !== 'undefined') {
      this.state.visuals.set("Description", this.props.state.description)
    }

    if (typeof this.props.state.locationType !== 'undefined') {
      this.state.visuals.set("Location Type",
          this.props.state.locationType.label)
      if (this.props.state.locationType.value === 'git') {
        if (this.props.state.locationInput !== ''
            && typeof this.props.state.locationInput !== 'undefined') {
          this.state.visuals.set("Repository", this.props.state.locationInput)
        }
        if (this.props.state.branchInput !== ''
            && typeof this.props.state.branchInput !== 'undefined') {
          this.state.visuals.set("Branch", this.props.state.branchInput)
        }
      }
      if (this.props.state.locationType.value === 'filesystem') {
        if (this.props.state.locationInput !== ''
            && typeof this.props.state.locationInput !== 'undefined') {
          this.state.visuals.set("Disk Location",
              this.props.state.locationInput)
        }
      }
    }

    if (this.props.state.server !== ''
        && typeof this.props.state.server !== 'undefined') {
      this.state.visuals.set("Server", this.props.state.server)
    }

    if (this.props.state.port !== ''
        && typeof this.props.state.port !== 'undefined') {
      this.state.visuals.set("Port", this.props.state.port)
    }

    if (this.props.state.suite !== ''
        && typeof this.props.state.suite !== 'undefined') {
      this.state.visuals.set("Suite", this.props.state.suite)
    }

    if (this.props.state.domain !== ''
        && typeof this.props.state.domain !== 'undefined') {
      this.state.visuals.set("Domain", this.props.state.domain)
    }

    if (this.props.state.pattern !== ''
        && typeof this.props.state.pattern !== 'undefined') {
      this.state.visuals.set("Pattern", this.props.state.pattern)
    }
    if (this.props.state.nameSuite !== ''
        && typeof this.props.state.nameSuite !== 'undefined') {
      this.state.visuals.set("Suite Name", this.props.state.nameSuite)
    }
    if (this.props.state.viewId !== ''
        && typeof this.props.state.viewId !== 'undefined') {
      this.state.visuals.set("View", this.props.state.viewId)
    }
  }

  render() {
    this.prepareVisuals()
    let list = Array.from(this.state.visuals.keys()).map((item, index) =>
        <tr key={index}>
          <td>{item}</td>
          <td>{this.state.visuals.get(item)}</td>
        </tr>
    );
    return (
        <table className="table table-hover table-bordered">
          <thead className="thead-light">
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
    );
  }
}

export default AETDisplay