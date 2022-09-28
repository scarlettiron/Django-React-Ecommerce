import './App.css';
import { HomeContextProvider } from './context/HomeContext';
import { CartContextProvider } from './context/CartContext';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Search from './pages/Search';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <Router>
        <HomeContextProvider>
          <CartContextProvider>
            <Route exact component={Home} path='/'/>
            <Route component={Product} path='/product/:product_id'/>
            <Route component={Cart} path='/cart'/>
            <Route component={Search} path='/search/'/>
          </CartContextProvider>
        </HomeContextProvider>
      </Router>
    </div>
  );
}

export default App;
