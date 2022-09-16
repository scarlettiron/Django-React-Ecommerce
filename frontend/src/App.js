import './App.css';
import { HomeContextProvider } from './context/HomeContext';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <Router>
        <HomeContextProvider>
          <Route exact component={Home} path='/'/>
          <Route component={Product} path='/product/:product_id'/>
        </HomeContextProvider>
      </Router>
    </div>
  );
}

export default App;
