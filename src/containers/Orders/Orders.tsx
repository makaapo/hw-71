import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteOrder, fetchOrders} from '../store/orderThunks';
import {SelectDeleteOrderLoading, selectOrders, selectOrdersLoading} from '../store/orderSlice';
import Spinner from '../../components/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectOrdersLoading);
  const deleteLoading = useAppSelector(SelectDeleteOrderLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onDeleteOrder = async (id: string) => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      await dispatch(fetchOrders()).unwrap();
      toast.success('Order completed!');
    } catch (error) {
      toast.error('Could not complete order!');
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="mt-4">
      <h3>
        <i className="bi bi-list-ol me-2"></i>
        Orders
      </h3>
      {orders.length === 0 ? (
        <h4 className="text-center">No orders available</h4>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.id} className="list-group-item border-warning">
              <div className="d-flex flex-column mb-3">
                {order.dishes.map((cartDish, index) => (
                  <div key={index} className="d-flex justify-content-between border-bottom">
                    <span>{cartDish.amount} x {cartDish.dish.title}:</span>
                    <span className="fw-bold">{cartDish.dish.price} KGS</span>
                  </div>
                ))}
                <div className="d-flex justify-content-between border-bottom">
                  <span>Delivery:</span>
                  <span className="fw-bold">{order.delivery} KGS</span>
                </div>
              </div>
              <div className="fs-5 d-flex justify-content-between border p-2 rounded">
                <span>Order total:</span>
                <span className="fw-bold">{order.totalPrice} KGS</span>
              </div>
              <div className="text-end">
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => onDeleteOrder(order.id)}
                  disabled={deleteLoading ? deleteLoading === order.id : false}
                >
                  {deleteLoading && deleteLoading === order.id && <ButtonSpinner/>}
                  <i className="bi bi-check-circle me-2"></i>
                  Complete order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
