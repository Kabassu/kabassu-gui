import Cookies from "js-cookie";

const initialstate = {
  username: '',
  password: '',
  message: ''
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    if (e.target.id === 'usernameInput') {
      this.setState({username: e.target.value});
    } else if (e.target.id === 'passwordInput') {
      this.setState({password: e.target.value});
    }
  }

  validate(state) {
    return state.username !== '' && state.password !== '';
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validate(this.state)) {
      fetch(process.env.kabassuServer + "/kabassu/login", {
        method: 'POST',
        crossDomain: true,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
              username: this.state.username,
              password_hash: this.state.password
            }
        )
      }).then(res => res.json())
      .then(
          (result) => {
            if(result.auth_token !== undefined){
              Cookies.set("token", result.auth_token)
              window.location = "/"
            } else {
              this.setState({
                username: '',
                password: '',
                message: <div className="alert alert-danger" role="alert">
                  Wrong login data
                </div>
              })
            }
          },
          (error) => {
            this.setState({
              message: <div className="alert alert-danger" role="alert">
                Wrong login data
              </div>
            })
          }
      )
    } else {
      this.setState({
        message: <div className="alert alert-danger" role="alert">
          Wrong login data
        </div>
      });
    }

  }

  render() {
    return (<>
          {this.state.message}
          <form onChange={this.onChange} onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput">User Name</label>
              <input type="text" className="form-control"
                     id="usernameInput" aria-describedby="nameHelp"
                     placeholder="Enter User Name" value={this.state.username}
                     autoComplete="username"/>
              <small id="nameHelp" className="form-text text-muted">
                Enter user name
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input type="password" className="form-control"
                     id="passwordInput" aria-describedby="configurationHelp"
                     placeholder="Enter Configuration"
                     value={this.state.password}
                     autoComplete="current-password"/>
              <small id="configurationHelp" className="form-text text-muted">
                Enter password
              </small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
    );
  }
}

export default LoginForm