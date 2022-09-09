import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact component={Home} path='/'/>
      </Router>
    </div>
  );
}

export default App;
