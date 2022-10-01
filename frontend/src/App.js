import './App.css';
import { HomeContextProvider } from './context/HomeContext';
import { CartContextProvider } from './context/CartContext';
import { CheckoutContextProvider } from './context/CheckoutContext';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Search from './pages/Search';
import Cart from './pages/Cart';
import CheckoutBilling from './pages/CheckoutBilling';
import CheckoutCardInfo from './pages/CheckoutCardInfo'

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
            <CheckoutContextProvider>
              <Route component={CheckoutBilling} path='/checkout'/>
              <Route component={CheckoutCardInfo} path='/confirm-purchase'/>
            </CheckoutContextProvider>
          </CartContextProvider>
        </HomeContextProvider>
      </Router>
    </div>
  );
}

export default App;
