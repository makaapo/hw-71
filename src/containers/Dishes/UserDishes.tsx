import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';
import { fetchDishes } from '../store/dishesThunks';
import { useAppSelector } from '../../app/hooks';
import { selectDishes, selectFetchDishLoading } from '../store/dishesSlice';
import DishUserItem from '../../components/DishItem/DishUserItem';
import Modal from '../../components/Modal/Modal';
import { Dish } from '../../types';
import { addDish, clearCart, removeDish, selectCartDishes } from '../store/cartSlice';
import { createOrder } from '../store/orderThunks';
import {toast} from 'react-toastify';
import {selectOrderLoading} from '../store/orderSlice';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const UserDishes = () => {
  const [showModal, setShowModal] = useState(false);
  const dishes = useAppSelector(selectDishes);
  const isFetching = useAppSelector(selectFetchDishLoading);
  const cartDishes = useAppSelector(selectCartDishes);
  const orderLoading = useAppSelector(selectOrderLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const addToCart = (dish: Dish) => {
    dispatch(addDish(dish));
  };

  const deleteCart = (id: string) => {
    dispatch(removeDish(id));
  };

  const toOrder = async () => {
    try {
      await dispatch(createOrder(cartDishes)).unwrap();
      dispatch(clearCart());
      setShowModal(false);
      toast.success('The order has been sent!');
    } catch (error) {
      toast.success('Error when sending order!');
    }
  };

  const cartTotal = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);
  const cartEmpty = cartDishes.length === 0;

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {dishes.map((dish) => (
            <DishUserItem addToCart={addToCart} key={dish.id} dish={dish} />
          ))}
          <div className="text-center">
            <p>Order total: {cartTotal} KGS</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
              disabled={cartEmpty}
            >
              <i className="bi bi-bag-plus me-2"></i>
              Checkout
            </button>
          </div>
          <Modal show={showModal} title="Your order" onClose={() => setShowModal(false)}>
            <div className="modal-body">
              {cartDishes.length > 0 ? (
                <>
                  {cartDishes.map((cartDish) => (
                    <div key={cartDish.dish.id} className="border border-black p-2 mb-2 rounded d-flex justify-content-between">
                      <span>{cartDish.dish.title} x {cartDish.amount}</span>
                      <strong>{cartDish.dish.price * cartDish.amount} KGS</strong>
                      <button onClick={() => deleteCart(cartDish.dish.id)} className="btn">
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p><i className="bi bi-truck me-2"></i>Delivery: 150 KGS</p>
                    <strong><i className="bi bi-wallet2 me-2"></i>Total: {cartTotal + 150} KGS</strong>
                    <div className="text-end">
                      <button
                        className="btn btn-success me-2"
                        onClick={toOrder}
                        disabled={orderLoading}
                      >
                        {orderLoading && (<ButtonSpinner/>)}
                        <i className="bi bi-check-square-fill me-2"></i>
                        Order
                      </button>
                      <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center">Cart is empty</p>
                  <div className="text-end">
                    <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserDishes;