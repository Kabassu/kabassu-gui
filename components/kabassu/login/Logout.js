import Cookies from "js-cookie";

class Logout extends React.Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  };

  onClick(e) {
    e.preventDefault();
    Cookies.remove("token")
    window.location = "/login"
  }

  render() {
    var logout =  <button onClick={this.onClick} className="btn btn-primary"> Logout
    </button>

    if(Cookies.get('token')===undefined){
      logout =  <button  className="btn btn-primary"> Login
      </button>
    }

    return logout;

  }
}

export default Logout