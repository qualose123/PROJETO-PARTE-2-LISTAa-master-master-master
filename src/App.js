import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Views/Home/Home'
import Details from './Views/Details/Details';

function App() {
  return (
    <div className="App">
      <h1>TO-DOO-LIST</h1>
    
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detalhes/:id" element={<Details />}/>
      </Routes>
    </div>
  );
}

export default App;
