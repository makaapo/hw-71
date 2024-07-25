import React, { useEffect } from 'react';
import {NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDishes } from '../../containers/store/dishesThunks';
import { selectDishes, selectFetchDishLoading } from '../../containers/store/dishesSlice';
import Spinner from '../Spinner/Spinner';
import DishItem from '../DishItem/DishItem';

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const isFetching = useAppSelector(selectFetchDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2>Dishes</h2>
        <NavLink to="/new-dish" className="btn btn-success">Add new dish</NavLink>
      </div>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {dishes.map(dish => (
            <DishItem key={dish.id} dish={dish}/>
          ))}
        </>
      )}
    </div>
  );
};

export default Dishes;
