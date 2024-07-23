import {NavLink} from 'react-router-dom';

const Dishes = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2>Dishes</h2>
      <NavLink to="/new-dish" className="btn btn-success">Add new dishes</NavLink>
    </div>
  );
};

export default Dishes;