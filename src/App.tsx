import {Route, Routes} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Dishes from './containers/Dishes/Dishes';
import NewDish from './containers/NewDish/NewDish';
import EditDish from './containers/EditDish/EditDish';
import UserDishes from './containers/Dishes/UserDishes';
import Orders from './containers/Orders/Orders';

const App = () => (
  <>
    <header className="bg-primary">
      <Toolbar />
    </header>
    <main className="container-fluid mt-3">
      <Routes>
        <Route path="/" element={<UserDishes/>}/>
        <Route path="/admin" element={<Dishes/>}/>
        <Route path="/admin/dishes" element={<Dishes/>}/>
        <Route path="/admin/new-dish" element={<NewDish/>}/>
        <Route path="/admin/orders" element={<Orders/>}/>
        <Route path="/admin/edit-dish/:id" element={<EditDish/>}/>
        <Route path="*" element={<h1 className="text-center">Not found</h1>}/>
      </Routes>
    </main>
  </>
);

export default App;
