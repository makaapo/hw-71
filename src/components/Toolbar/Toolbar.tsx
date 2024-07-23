import {NavLink} from 'react-router-dom';

const Toolbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex fs-3">
          <i className="bi bi-play me-2"></i>
          Turtle pizza
        </NavLink>

        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/" className="nav-link"><i className="bi bi-house-door-fill me-2"></i>Dishes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/orders" className="nav-link"><i className="bi bi-bag-check-fill me-2"></i>Orders</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Toolbar;