import React from 'react';
import DishForm from '../../components/DishForm/DishForm';



const NewDish: React.FC = () => {

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm />
      </div>
    </div>
  );
};

export default NewDish;
