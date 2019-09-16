import Link from 'next/link';
import Logout from "../kabassu/login/Logout";

const AdminHeader = (props) => {
  return <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fa fa-bars"/></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link href="/"><a className="nav-link">Kabassu</a></Link>
      </li>
    </ul>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="fa fa-comments-o fa-fw"/>
          <span className="badge badge-info navbar-badge">0</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div className="dropdown-divider"/>
          <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="fa fa-bell-o"/>
          <span className="badge badge-info navbar-badge">0</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-header">0 Notifications</span>
          <div className="dropdown-divider"/>
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <Logout/>
      </li>
      {/*<li className="nav-item">
        <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i className="fa fa-th-large"/></a>
      </li>*/}
    </ul>
  </nav>
};

export default AdminHeader;