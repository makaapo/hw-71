import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchDishes} from '../store/dishesThunks';
import {selectDishes, selectFetchDishLoading} from '../store/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';
import DishItem from '../../components/DishItem/DishItem';

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
        <NavLink to="/admin/new-dish" className="btn btn-success">
          <i className="bi bi-plus-square me-2"></i>Add new dish
        </NavLink>
      </div>
      {isFetching ? (
        <Spinner />
      ) : (
        dishes.length === 0 ? (
          <h4 className="text-center">No dishes available</h4>
        ) : (
          <>
            {dishes.map(dish => (
              <DishItem key={dish.id} dish={dish}/>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default Dishes;
