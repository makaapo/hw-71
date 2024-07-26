import React from 'react';
import {Dish} from '../../types';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteDish, fetchDishes} from '../../containers/store/dishesThunks';
import {selectDeleteDishLoading, selectFetchDishLoading} from '../../containers/store/dishesSlice';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {toast} from 'react-toastify';

interface Props {
  dish: Dish;
}

const DishItem: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const dishesLoading = useAppSelector(selectFetchDishLoading);
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
    height: '190px',
  };

  const removeDish = async (id: string) => {
    try {
      await dispatch(deleteDish(id)).unwrap();
      await dispatch(fetchDishes()).unwrap();
      toast.success('Dish deleted!');
    } catch (error) {
      toast.error('Could not delete dish!');
    }
  };

  return (
    <>
      {dishesLoading ? (
        <Spinner />
      ) : (
        <div className="d-flex justify-content-center text-center">
          <div className="card mb-2 w-100" style={{height: '210px'}}>
            <div className="row g-0 p-2">
              <div className="col-sm-2 rounded img-fluid" style={imageStyle}/>
              <div className="col-sm-10 ps-5 d-flex justify-content-between align-items-center">
                <h5 className="card-title">{dish.title}</h5>
                <strong className="card-text">{dish.price} KGS</strong>
                <p className="d-flex gap-2">
                  <button
                    className="btn fs-3 text-danger d-flex align-items-center"
                    onClick={() => removeDish(dish.id)}
                    disabled={deleteLoading ? deleteLoading === dish.id : false}
                  >
                    {deleteLoading && deleteLoading === dish.id && (<ButtonSpinner/>)}
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  <Link className="btn fs-3" to={`/admin/edit-dish/${dish.id}`}>
                    <i className="bi bi-pencil-square text-primary"></i>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DishItem;
