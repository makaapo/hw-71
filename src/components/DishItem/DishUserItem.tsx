import React from 'react';
import {Dish} from '../../types';

interface Props {
  dish: Dish;
  addToCart: (dish: Dish) => void;
}
const DishUserItem: React.FC<Props> = ({dish, addToCart}) => {
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
  };
  return (
    <div className='btn border d-flex w-50 mx-auto my-3 p-3 align-items-center justify-content-between'
         onClick={() => addToCart(dish)}>
      <div className="col-sm-3 rounded p-5" style={imageStyle}/>
      <p className="me-5"><b>{dish.title}</b></p>
      <div className="d-flex">
        <strong className="ms-5">{dish.price} KGZ</strong>
      </div>
    </div>
  );
};

export default DishUserItem;