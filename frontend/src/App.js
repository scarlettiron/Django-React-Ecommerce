import './App.css';
import Home from './pages/Home';
import { HomeContextProvider } from './context/HomeContext';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <HomeContextProvider>
          <Route exact component={Home} path='/'/>
        </HomeContextProvider>
      </Router>
    </div>
  );
}

export default App;
