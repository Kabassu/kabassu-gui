import Cookies from "js-cookie";

class Credentials extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    process.env.token = Cookies.get('token')
    var loginPage = "/login"
    if(window.location.pathname !== loginPage && process.env.token == undefined){
      window.location = loginPage
    }
  }

  render() {
    return (
        <div/>
    );
  }
}

export default Credentials