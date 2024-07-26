import {Location, NavLink, useLocation} from 'react-router-dom';

const Toolbar = () => {
  const location: Location = useLocation();

  const adminPage = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex fs-3">
          <i className="bi bi-play me-2"></i>
          Turtle pizza
        </NavLink>

        {adminPage && (
          <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
            <li className="nav-item">
              <NavLink to="admin/dishes" className="nav-link">
                <i className="bi bi-house-door-fill me-2"></i>Dishes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link">
                <i className="bi bi-bag-check-fill me-2"></i>Orders
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Toolbar;
