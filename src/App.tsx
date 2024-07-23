import Toolbar from './components/Toolbar/Toolbar';
import Dishes from './components/Dishes/Dishes';
import {Route, Routes} from 'react-router-dom';
import NewDish from './containers/NewDish/NewDish';

const App = () => (
  <>
    <header className="bg-primary ">
      <Toolbar />
    </header>
    <main className="container-fluid mt-3">
      <Routes>
        <Route path="/" element={<Dishes />}/>
        <Route path="/new-dish" element={<NewDish/>}/>
        <Route path="*" element={(<h1 className="text-center">Not found</h1>)}/>
      </Routes>
    </main>
  </>
);

export default App;
