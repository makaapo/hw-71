import React from 'react';
import { Dish } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  dish: Dish;
}

const DishItem: React.FC<Props> = ({dish }) => {
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
  };
  return (
    <div className="card mb-2">
      <div className="row g-0 p-2">
        <div className="col-sm-2 rounded-start p-5" style={imageStyle} />
        <div className="col-sm-10 ps-5 d-flex justify-content-between align-items-center">
          <h5 className="card-title">{dish.title}</h5>
          <strong className="card-text">{dish.price} KGS</strong>
          <p className="d-flex gap-2">
            <button
              className="btn btn-danger">
              Delete
            </button>
            <Link className="btn btn-primary" to={`/edit-dish/${dish.id}`}>
              Edit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DishItem;
