import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
// import MiniCard from './components/MiniCard/MiniCard';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/browse' element={<Home/>} />
      </Routes>
      {/* <MiniCard /> */}
    </div>
  );
}

export default App;
