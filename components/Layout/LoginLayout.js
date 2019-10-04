import "../../styles/styles.scss"

import PropTypes from 'prop-types';
import Credentials from "../kabassu/login/Credentials";

/**
 * Main login layout - A Higher Order Component
 */
class LoginLayout extends React.Component {
  render() {
    return <div className="login-page login-box">
      <Credentials/>
        {this.props.children}
    </div>
  }
}

LoginLayout.propTypes = {
  contentTitle: PropTypes.string,
  contentTitleButton: PropTypes.element,
};
export default LoginLayout