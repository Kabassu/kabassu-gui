
class Credentials extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('storage', (event) => {
      console.log(event)
      const credentials = JSON.parse(
          window.sessionStorage.getItem('CREDENTIALS_TOKEN'))
      if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials) {
        window.localStorage.setItem('CREDENTIALS_SHARING',
            JSON.stringify({token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY4MjkyNzg5fQ.vojYOgoQa8cg6vgqkzVOnVrhVIyaT0ryAUEwBc33pYQ'}))
        window.localStorage.removeItem('CREDENTIALS_SHARING')
      }
      if (event.key === 'CREDENTIALS_SHARING' && !credentials) {
        window.sessionStorage.setItem('CREDENTIALS_TOKEN', event.newValue)
      }
    })
    window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS',
        Date.now().toString())
    window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')
  }


  render() {
    return (
        <div/>
    );
  }
}

export default Credentials