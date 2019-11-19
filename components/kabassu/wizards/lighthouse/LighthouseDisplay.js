class LighthouseDisplay extends React.Component {

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
    for (let [key, value] of this.props.state.parameters) {
      this.state.visuals.set(key, value)
    }
    if (this.props.state.url !== ''
        && typeof this.props.state.url !== 'undefined') {
      this.state.visuals.set("Page", this.props.state.url)
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

export default LighthouseDisplay