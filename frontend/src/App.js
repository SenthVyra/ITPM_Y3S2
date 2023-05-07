import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit'
import './App.css';
import './bootstrap.min.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* for path setting */}
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Add' element={<Add/>}/>
            <Route path='/Edit/:id' element={<Edit/>}/>
          </Routes>
        </Router>       
      </header>
    </div>
  );
}

export default App;
