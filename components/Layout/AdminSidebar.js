import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

class AdminSidebar extends React.Component {
  render() {
    const { pathname } = this.props.router;
    return <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight: '846px'}}>
      <Link href="/">
        <a className="brand-link text-center">
          <img src="/static/images/kabassu.png" className="logo"/>
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

            <li className="nav-item">
              <Link href="/views">
                <a className={['nav-link', pathname === '/views' ? 'active' : ''].join(' ')}>
                  <i className="nav-icon fa fa-home"/>
                  <p>Views</p>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/executions">
                <a className={['nav-link', pathname === '/executions' ? 'active' : ''].join(' ')}>
                  <i className="nav-icon fa fa-home"/>
                  <p>Executions</p>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/definitions">
                <a className={['nav-link', pathname === '/definitions' ? 'active' : ''].join(' ')}>
                  <i className="nav-icon fa fa-home"/>
                  <p>Definitions</p>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/configurations">
                <a className={['nav-link', pathname === '/configurations' ? 'active' : ''].join(' ')}>
                  <i className="nav-icon fa fa-home"/>
                  <p>Configurations</p>
                </a>
              </Link>
            </li>

            <li className="nav-item has-treeview menu-closed">
              <a href="#" className="nav-link">
                <i className="nav-icon fa fas fa-edit"/>
                <p>
                  Create
                  <i className="right fa fa-angle-left"/>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link href="/addtestrequest">
                    <a className={['nav-link', pathname === '/addtestrequest' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Create Test Request</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/addtestdefinition">
                    <a className={['nav-link', pathname === '/addtestdefinition' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Create Test Definition</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/addtestsuite">
                    <a className={['nav-link', pathname === '/addtestsuite' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Create Test Suite</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/addconfiguration">
                    <a className={['nav-link', pathname === '/addconfiguration' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Create Configuration</p>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview menu-closed">
              <a href="#" className="nav-link">
                <i className="nav-icon fa fas fa-edit"/>
                <p>
                  Wizards
                  <i className="right fa fa-angle-left"/>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link href="/wizards/wizardgradle">
                    <a className={['nav-link', pathname === '/wizards/wizardgradle' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Gradle Test</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/wizards/wizardrobot">
                    <a className={['nav-link', pathname === '/wizards/wizardrobot' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Robot Test</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/wizards/wizardaet">
                    <a className={['nav-link', pathname === '/wizards/wizardaet' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>AET Test</p>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/wizards/wizardlighthouse">
                    <a className={['nav-link', pathname === '/wizards/wizardlighthouse' ? 'active' : ''].join(' ')}>
                      <i className="nav-icon fa  fa-plus-square"/>
                      <p>Lighthouse Test</p>
                    </a>
                  </Link>
                </li>
              </ul>
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