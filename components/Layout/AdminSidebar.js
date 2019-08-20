import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

class AdminSidebar extends React.Component {
  render() {
    const { pathname } = this.props.router;
    return <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight: '846px'}}>
      <Link href="/">
        <a className="brand-link text-center">
          <i className="fa fa-home fa-2x brand-image ml-2"/>
          <span className="brand-text font-weight-light">{this.props.projectName && this.props.projectName}</span>
        </a>
      </Link>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link href="/">
                <a className={['nav-link', pathname === '/' ? 'active' : ''].join(' ')}>
                  <i className="nav-icon fa fa-home"/>
                  <p>Home</p>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  }
}

AdminSidebar.propTypes = {
  projectName: PropTypes.string,
};

AdminSidebar.defaultProps = {
  projectName: 'Kabassu GUI'
};

export default withRouter(AdminSidebar)