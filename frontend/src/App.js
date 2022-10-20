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
import CheckoutSuccess from './pages/CheckoutSuccess'
import Categories from './pages/Categories';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Privacy from './pages/basic/Privacy';
import TermsAndConditions from './pages/basic/TermsAndConditions';
import FindOrder from './pages/FindOrder';

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
            <Route component={CheckoutSuccess} path='/checkout-success'/>
            <Route exact component={Categories} path='/categories/all'/>
            <Route component={Categories} path='/categories/:category'/>
            <Route component={Products} path='/products/:category'/>
            <Route component={Contact} path='/contact'/>

            <Route component={Privacy} path='/privacy'/>
            <Route component={TermsAndConditions} path='/termsandconditions'/>
            <Route component={FindOrder} path='/findorder'/>
          </CartContextProvider>
        </HomeContextProvider>
      </Router>
    </div>
  );
}

export default App;
