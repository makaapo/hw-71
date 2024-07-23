import React from 'react';
import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';



const NewDish: React.FC = () => {

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={(newDish: ApiDish) => newDish} />
      </div>
    </div>
  );
};

export default NewDish;
