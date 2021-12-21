import './sidebar.css';
import logo from '../../../assets/logo.svg';
import { NavLink, withRouter } from 'react-router-dom';
import { MenuList } from '../../utils/sideMenu';
import { useAuthState } from '../../context/useAuthContext';
import { useLocation } from 'react-router-dom';
const Sidebar = ({ sidebarOpen, closeSidebar, props }) => {
  const { user, dispatch } = useAuthState();
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split('/');
  const filteredList = menuItems => {
    const permission = user.permission;

    if (permission) {
      return menuItems.filter(
        x =>
          (x.permissions && permission.some(r => x.permissions.indexOf(r) >= 0)) ||
          !x.permissions ||
          x.permissions?.length === 0,
      );
    } else {
      return menuItems;
    }
  };
  return (
    <div className={sidebarOpen ? 'sidebar_responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" color="white" />
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        {filteredList(MenuList).map(x => {
          var node;
          var sub_node;
          if (x.subs == undefined || x.subs.length == 0) {
            return (
              <div
                className={
                  splitLocation[2] === x.to
                    ? 'd-flex align-items-center sidebar__link  active_menu_link'
                    : 'sidebar__link'
                }
                key={x.label}
              >
                {/* <i className={x.icon}></i> */}
                {x.icon}
                <NavLink to={x.to} className="mx-2">
                  {x.label}
                </NavLink>
              </div>
            );
          } else {
            sub_node = filteredList(x.subs).map(s => (
              <div className="sidebar__link ">
                <i className="fa fa-home"></i>
                <a href={x.to}>{x.label}</a>
              </div>
            ));
          }
        })}

        {/* <div className="sidebar__link">
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <a href="#">Admin Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="#">Company Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="#">Employee Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <a href="#">Warehouse</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Contracts</a>
        </div> */}

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a
            onClick={() => {
              localStorage.clear();
              // window.location.href = 'https://onemedy.com';
              window.location.href = 'http://localhost:3001';
            }}
            style={{ cursor: 'pointer' }}
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
