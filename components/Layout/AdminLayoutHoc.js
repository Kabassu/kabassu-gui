import "../../styles/styles.scss"
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSidebar from "../../components/Layout/AdminSidebar";
import AdminControlSidebar from "../../components/Layout/AdminControlSidebar";
import AdminContent from "../../components/Layout/AdminContent";
import PropTypes from 'prop-types';
import Credentials from "../kabassu/login/Credentials";

/**
 * Main admin layout - A Higher Order Component
 */
class AdminLayoutHoc extends React.Component {
  render() {
    return <div className="wrapper">
      <Credentials/>
      <AdminHeader/>
      <AdminSidebar/>
      <AdminContent title={this.props.contentTitle} titleButton={this.props.contentTitleButton} menu={this.props.menu}>
        {this.props.children}
      </AdminContent>
      <AdminControlSidebar/>
      {/*<AdminFooter rightContent={'Some text for the footer'} leftContent={<div>I must be an element</div>}/>*/}
    </div>
  }
}

AdminLayoutHoc.propTypes = {
  contentTitle: PropTypes.string,
  contentTitleButton: PropTypes.element,
  menu: PropTypes.element,
};
export default AdminLayoutHoc