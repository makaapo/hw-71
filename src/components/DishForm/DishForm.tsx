import React, {useState} from 'react';
import {ApiDish, DishMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateDishLoading} from '../../containers/store/dishesSlice';
import {createDish} from '../../containers/store/dishesThunks';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

interface Props {
  existingDish?: ApiDish;
}

const emptyState: DishMutation = {
  title: '',
  image: '',
  price: '',
};

const DishForm: React.FC<Props> = ({ existingDish }) => {
  const initialState: DishMutation = existingDish
    ? { ...existingDish, price: existingDish.price.toString() }
    : emptyState;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateDishLoading);
  const [dishMutation, setDishMutation] = useState<DishMutation>(initialState);

  const changeDish = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDishMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(
        createDish({
          ...dishMutation,
          price: parseFloat(dishMutation.price),
        })
      ).unwrap();
      navigate('/');
      toast.success('Dish created successfully.');
    } catch (error) {
      toast.error('Could not create dish');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingDish ? 'Edit dish' : 'Add new dish'}</h4>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="form-control"
          onChange={changeDish}
          value={dishMutation.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          required
          className="form-control"
          onChange={changeDish}
          value={dishMutation.image}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          min="1"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.price}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isCreating}
      >
        {isCreating && <ButtonSpinner />}
        {existingDish ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default DishForm;
